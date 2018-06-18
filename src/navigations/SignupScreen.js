import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import axios from 'axios';
import { ButtonGroup, FormLabel, FormInput, Card, Button  } from 'react-native-elements';
const styles = StyleSheet.create({
    labelText: {
        fontSize: 16,
        fontWeight: '400'
    },
    cardMain: {
        marginBottom: 50
    }
});
class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            ShopKeeperFormData: {
                shopkeeper: true,
                shopInfo: {

                }
            },
            CustomerFormData: {
                customer: true,
                custInfo: {

                }
            }
        }
    }
    updateIndex =  (selectedIndex) => {
        this.setState({selectedIndex})
    };
    static navigationOptions = {
        title: 'Sign Up',
        headerStyle: {
            backgroundColor: '#327BFF'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            width:'100%'
        },
    };
    updateValue = (Property, value, nestedProperty=null, thirdNested=null) => {
      const { selectedIndex } = this.state;
      let FormToPutProperty = (selectedIndex === 0) ? 'ShopKeeperFormData' : 'CustomerFormData';
      let FormToPutPropertyIn = this.state[FormToPutProperty];
      if(Property && !nestedProperty && !thirdNested) {
          FormToPutPropertyIn[Property] = value;
      }
      else if(Property && nestedProperty && !thirdNested) {
          if(!FormToPutPropertyIn[nestedProperty]) {
              FormToPutPropertyIn[nestedProperty] = {}
          }
          FormToPutPropertyIn[nestedProperty][Property] = value;
      } else {
          if(!FormToPutPropertyIn[nestedProperty]) {
              FormToPutPropertyIn[nestedProperty] = {}
          }
          if(!FormToPutPropertyIn[nestedProperty][thirdNested]) {
              FormToPutPropertyIn[nestedProperty][thirdNested] = {}
          }
          FormToPutPropertyIn[nestedProperty][thirdNested][Property]= value;
      }
      console.log(FormToPutPropertyIn);
      if(selectedIndex === 0) {
          this.setState({ShopKeeperFormData: FormToPutPropertyIn})
      } else {
          this.setState({CustomerFormData: FormToPutPropertyIn})
      }
    };
    // SignUpUser = () => {
    //     axios.get('http://facebook.github.io/react-native/movies.json').then(res => (console.log(res)))
    // };
    SignUpUser =() => {
      const { selectedIndex, ShopKeeperFormData, CustomerFormData } = this.state;
      if(selectedIndex === 0 ){
          try{
              axios.post('https://my-shop-01.herokuapp.com/users/signup',ShopKeeperFormData).then((resp) => {
                  console.log(resp)
              }).catch(err => {
                  console.log(err)
              })
          }
          catch (e) {
              console.log(e)
          }

      } else {
          axios.post('https://my-shop-01.herokuapp.com/users/signup',CustomerFormData).then((resp) => {
              console.log(resp)
          }).catch(err => {
              console.log(err)
          })
      }
    };
    render() {
        const buttons = ['Shop Keeper', 'Customer'];
        const {selectedIndex} = this.state;
        return (
            <ScrollView style={{flex:1}}>
                <ButtonGroup elevation={1}
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 50}}
                    textStyle={{fontSize:20}}
                    selectedButtonStyle={{backgroundColor:'#ffffff'}}
                    buttonStyle ={{backgroundColor:'#F9F9F9'}}
                />
                <Text style={{fontSize:22, color:'#7e7e7e', textAlign:'center', margin: 10, marginBottom: 5}} >{`${selectedIndex === 0 ? 'Shop ' : 'Customer'} General Information`}</Text>
                {
                    (selectedIndex === 0 ) && <Card>
                        <FormLabel labelStyle={styles.labelText} >Tin Number</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("tinNo", val); this.updateValue("tinNo", val,"shopInfo")}}/>
                        <FormLabel labelStyle={styles.labelText} >Aadhaar Number</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("aadhaarNo", val,"shopInfo")}}/>
                        <FormLabel labelStyle={styles.labelText} >Shop Name</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("shopName", val,"shopInfo")}}/>
                        <FormLabel labelStyle={styles.labelText} >Shop Number</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("shop_no", val,"shopInfo", "address")}}/>
                        <FormLabel labelStyle={styles.labelText} >Shop Locality</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("locality", val,"shopInfo", "address")}}/>
                        <FormLabel labelStyle={styles.labelText} >City</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("city", val,"shopInfo", "address")}}/>
                        <FormLabel labelStyle={styles.labelText} >Pin Code</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("pincode", val,"shopInfo", "address")}}/>
                        <FormLabel labelStyle={styles.labelText} >State</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("state", val,"shopInfo", "address")}}/>
                    </Card>
                }
                {
                    (selectedIndex === 1 ) && <Card>
                        <FormLabel labelStyle={styles.labelText} >Aadhaar Number</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("aadhaarNo", val,"custInfo")}}/>
                        <FormLabel labelStyle={styles.labelText} >House Number</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("shop_no", val,"custInfo", "address")}}/>
                        <FormLabel labelStyle={styles.labelText} >Locality</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("locality", val,"custInfo", "address")}}/>
                        <FormLabel labelStyle={styles.labelText} >City</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("city", val,"custInfo", "address")}}/>
                        <FormLabel labelStyle={styles.labelText} >Pin Code</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("pincode", val,"custInfo", "address")}}/>
                        <FormLabel labelStyle={styles.labelText} >State</FormLabel>
                        <FormInput onChangeText={val => {this.updateValue("state", val,"custInfo", "address")}}/>
                    </Card>
                }
                <Text style={{fontSize:22, color:'#7e7e7e', textAlign:'center', margin: 10, marginBottom: 5}} >{`${selectedIndex === 0 ? 'Shopkeeper\'s' : 'Customer\'s'} Personal Information`}</Text>
                <Card containerStyle={styles.cardMain}>
                    <FormLabel labelStyle={styles.labelText}>First Name</FormLabel>
                    <FormInput onChangeText={val => {this.updateValue("firstname", val)}}/>
                    <FormLabel labelStyle={styles.labelText} >Last Name</FormLabel>
                    <FormInput onChangeText={val => {this.updateValue("lastname", val)}}/>
                    <FormLabel labelStyle={styles.labelText} >User Name</FormLabel>
                    <FormInput onChangeText={val => {this.updateValue("username", val)}}/>
                    <FormLabel labelStyle={styles.labelText} >Password</FormLabel>
                    <FormInput onChangeText={val => {this.updateValue("password", val)}}/>
                    <FormLabel labelStyle={styles.labelText} >Phone Number</FormLabel>
                    <FormInput onChangeText={val => {this.updateValue("phoneNo", val)}}/>
                </Card>
                <Button containerViewStyle={{marginTop: -10, marginBottom:40}} backgroundColor={'#327BFF'} color={'#ffffff'} title={'Sign Up'}
                    onPress={this.SignUpUser} large raised
                    background={TouchableNativeFeedback.Ripple('#fff', true)}>
                </Button >

            </ScrollView>
        )
    }
}

export default SignupScreen;

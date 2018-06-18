import React, { Component } from 'react';
import axios from 'axios';
import { createStackNavigator } from 'react-navigation';
import { View, Text, Dimensions, TextInput ,TouchableNativeFeedback, Image, StatusBar } from 'react-native';
const { width, height } = Dimensions.get("window");
const Logo = require("../images/groceryimage.png");
console.disableYellowBox = true;
styles={
    pageBackground:{
        backgroundColor:"#327BFF",
        width:"100%",
        height:"100%",
        justifyContent:"flex-start",
        padding: 15
    },

    inputs:{
        height:40,
        marginBottom:10,
        paddingHorizontal:10,
        color: '#7E7E7E',
        marginLeft:10,
        marginRight:10,
        fontSize: 20,
        backgroundColor: '#EBF8FF'

    },

    groceryLogo:{
       justifyContent:"center"
    },
    images:{
     width: (0.9 * width),
    resizeMode: 'contain',
    alignSelf: 'center'
    },
    mainContainer:{
        zIndex:3,
        backgroundColor: "#F9F9F9",
        width:'100%',
        minHeight:'55%',
        marginTop: 30,
        paddingTop: 20
    },

    headerContent:{
        fontSize:24,
        color:'#7e7e7e',
        textAlign:'center',
        marginBottom: 15
    },
    loginButtonContainerStyle:{
        width: ('100%'-10),
        height: 40,
        margin:10,
        backgroundColor: '#327BFF',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        zIndex: 2
    },
    loginButtonTextStyle:{
        fontSize:23,
        color: '#ffffff',
    },
    signupButtonContainerStyle:{
        width: ('100%'-10),
        height: 40,
        margin:10,
        marginTop: 0,
        backgroundColor: '#EBF8FF',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'

    },
    signupButtonTextStyle:{
     fontSize:23,
    color: '#7e7e7e',
    },
    lowerView:{
        position:'relative',
        left: -15,
        top: '-50%',
        bottom:0,
        minWidth: width,
        minHeight: height*0.55,
        zIndex: 1,
        backgroundColor:'#ffffff'
    },
    middleView:{
        alignContent:'center',
        justifyContent:'center',
        zIndex:3
    },

    middleText:{
        fontSize:24,
        color:'#7e7e7e',
        textAlign:'center',
        marginBottom: 15
    }


};

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            userName:"",
            password:""
        }
    }
    static navigationOptions = {
        title: 'Sign Up',
        header:null
    };
    loginUser=()=>{
       const self = this;
       axios.post('https://my-shop-01.herokuapp.com/users/login', {
           username: self.state.userName,
           password: self.state.password
       },{
           headers: {
               'Content-Type': 'application/json',
           }
       })
           .then((response) => {
               alert(response);
               self.props.navigation.push('Signup');
           })
           .catch((error) => {
               console.log(error);
           });

   };
    render() {
        return (
            <View style={styles.pageBackground}>
                <StatusBar
                    backgroundColor="#327BFF"
                    barStyle="light-content"
                />
                <View style={styles.groceryLogo}>
                    <Image style={styles.images} source={Logo}/>
                </View>
                <View style={styles.mainContainer} elevation={3}>
                    <Text style={styles.headerContent} >Please Enter Your Credentials</Text>
                    <TextInput underlineColorAndroid={"transparent"} style={styles.inputs} placeholder="Username" onChange={(event)=>this.setState({userName:event.target.value})} value={this.state.userName}/>
                    <TextInput underlineColorAndroid={"transparent"} style={styles.inputs} placeholder="Password" secureTextEntry onChange={(event)=>this.setState({password:event.target.value})} value={this.state.password}/>
                    <TouchableNativeFeedback
                        onPress={this.loginUser}
                        background={TouchableNativeFeedback.Ripple('#fff', true)}>
                        <View style={styles.loginButtonContainerStyle}>
                            <Text style={styles.loginButtonTextStyle}>Sign In</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.middleView}>
                        <Text style={styles.middleText} >Or</Text>
                        <TouchableNativeFeedback
                        onPress={()=>this.props.navigation.navigate('SignUp')}
                        background={TouchableNativeFeedback.Ripple('#fff', true)}>
                            <View style={styles.signupButtonContainerStyle}>
                                <Text style={styles.signupButtonTextStyle}>Sign Up</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={styles.lowerView}>
                </View>
            </View>
        )
    }
}

export default LoginScreen;
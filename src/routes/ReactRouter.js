import React from  'react';
import {LoginScreen , SignupScreen} from '../navigations';
import { createStackNavigator } from 'react-navigation';
const ReactRouter = createStackNavigator(
    {
        Login: LoginScreen,
        SignUp: SignupScreen,
    },
    {
        initialRouteName: 'Login',
    },

);
export default ReactRouter;

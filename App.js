/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import  ReactRouter from './src/routes/ReactRouter'


export default class App extends Component<Props> {
    render() {
        return (
            <ReactRouter/>
        );
    }
}
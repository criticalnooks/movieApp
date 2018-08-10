import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { registerScreens } from './container';
import { createStore  } from 'redux';
import { Provider } from 'react-redux';


registerScreens();


export default class App extends Component {
    constructor(props){
      super(props);
      
      

      Navigation.startSingleScreenApp({
        screen: {
          screen: 'LoginScreen', 
        },
      });
    }
}



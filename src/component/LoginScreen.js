import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { ipaddr } from '../globals/Vars';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

class LoginScreen extends React.Component {
   constructor(props) {
      super(props);
    }

  static navigatorStyle = {
    navBarHidden: true
  };

  onLoginButtonPress() {
    var username = this.props.username;
    var password = this.props.password;
    if ( username.length !== 0 && password.length !== 0 ){
      fetch('http://'+ipaddr+':3000/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.status === 'success'){
              if(responseJson.usertype !== 'OTHER'){
                  this.props.setUserType(responseJson.usertype);
                  this.onLoginSuccess();
                }else{
                  ToastAndroid.show('เฉพาะ MANAGER, TEAMLEADER, or FLOORSTAFF ที่ได้รับอนุญาต! ', ToastAndroid.SHORT);
                }
                
            }else{
              ToastAndroid.show('Login Fail ' + responseJson.status, ToastAndroid.SHORT);
            }
            
            console.log(responseJson);

          })
          .catch((error) => {
            console.error(error);
          });
    }else{
        ToastAndroid.show('Please input username or password', ToastAndroid.SHORT);
    }

  }

  onRegisterButtonPress(){
    Navigation.showLightBox({
      screen: 'RegisterModal', // unique ID registered with Navigation.registerScreen
      style: {
        backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });
  }

  onLoginSuccess() {
    fetch('http://'+ipaddr+':3000/movies/getallmovies')
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.setupMovies(responseJson);
      this.onNavigate();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onNavigate(){
    this.props.navigator.push({
      screen: 'MoviesScreen',
      animated: true, 
      navigatorStyle: { navBarComponentAlignment: 'center'},
    });
  }
  

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{  alignItems: 'center'}}>
              <Image  source={require('../../img/movie-app-icon.png') }
                style={styles.imageIconStyle}/>
              <Text style={styles.headerTextStyle}>MOVIE APP</Text>
              
       
              <TextInput  style={styles.textInputStyle}

                          underlineColorAndroid='rgba(0,0,0,0)'
                          onChangeText={(text) => this.props.onChangeUsername(text) }
                          value={this.props.username}
                          placeholder='username'
              />

              <TextInput  style={styles.textInputStyle}
                    
                          underlineColorAndroid='rgba(0,0,0,0)'
                          onChangeText={(text) => this.props.onChangePassword(text) }
                          value={this.props.password}
                          secureTextEntry={true}
                          placeholder='password'
              />


              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() =>  this.onLoginButtonPress()}
                style={{margin:10}}>
                 <View style={styles.buttonStyle}>
                  <Text style={{color: '#FFFFFF'}}>เข้าสู่ระบบ</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() =>  this.onRegisterButtonPress()}>
                <View style={styles.buttonStyle}>
                  <Text style={{color: '#FFFFFF'}}>สมัครสมาชิก</Text>
                </View>
              </TouchableOpacity>

          </View>

        </View>

         
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextStyle:{
    fontFamily:'Athiti-Regular',
    fontSize:30,
    paddingBottom:20,
    fontWeight:'bold'
  },
  textInputStyle:{
    height: 40, 
    width:210,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#ccc5b9',
    marginBottom:10,
    paddingHorizontal: 10,
    backgroundColor:'white',
    fontFamily:'Athiti-Regular'

  },
  buttonStyle :{
    width: 150,
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    backgroundColor: '#68b3c8'
  },
  imageIconStyle: {
    width: 160,
    height: 160,
    marginBottom:15,
  },
};

export default LoginScreen;


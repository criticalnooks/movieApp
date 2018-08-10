import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { ipaddr } from '../../globals/Vars';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Picker
} from 'react-native';

class RegisterScreen extends React.Component {
    static navigatorStyle = {
        navBarHidden: true,
    };

   constructor(props) {
      super(props);
    }


    onRegisterButtonPress() {
    var username = this.props.username;
    var password = this.props.password;
    var usertype = this.props.usertype;
    if ( username.length !== 0 && password.length !== 0 && usertype.length !== 0){
      fetch('http://'+ipaddr+':3000/users/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          type: usertype
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            // return responseJson.movies;
            if(responseJson.status === 'success'){
                this.onRegisterSuccess();
            }else{
              ToastAndroid.show('สมัครสมาชิกไม่สำเร็จ ' + responseJson.status, ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }else{
        ToastAndroid.show('กรุณากรอก username/password/type', ToastAndroid.SHORT);
    }

  }
  onBackButtonPress() {
    Navigation.dismissLightBox();
  }
  onRegisterSuccess(){
    ToastAndroid.show('สมัครสมาชิกสำเร็จกรุณาเข้าสู่ระบบ!', ToastAndroid.SHORT);
    Navigation.dismissLightBox();
  }
  


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{  alignItems: 'center'}}>
            <Text style={styles.headerTextStyle}>สมัครสมาชิก</Text>
              
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

            <View style={{flexDirection:'row',borderWidth: 1,borderRadius: 7, borderColor: '#ccc5b9',marginBottom:10}}>
              <Picker
                  selectedValue={this.props.usertype}
                  style={{ height: 40, width: 250 }}
                  mode='dropdown'
                  prompt='rating'
                  onValueChange={(itemValue, itemIndex) => this.props.onChangeUserType(itemValue)}>
                  <Picker.Item label="กรุณาเลือก Type" value="" />
                  <Picker.Item label="MANAGER" value="MANAGER" />
                  <Picker.Item label="TEAMLEADER" value="TEAMLEADER" />
                  <Picker.Item label="FLOORSTAFF" value="FLOORSTAFF" />
                  <Picker.Item label="OTHER" value="OTHER" />
              </Picker>
            </View>

              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() =>  this.onRegisterButtonPress()}
                style={{margin:10}}>
                <View style={styles.buttonStyle}>
                  <Text style={{color: '#FFFFFF'}}>ยืนยัน</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() =>  this.onBackButtonPress()}>
                <View style={styles.buttonStyle}>
                  <Text style={{color: '#FFFFFF'}}>ย้อนกลับ</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : 'white',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: 5,
    padding: 16,
  },
  textInputStyle:{
    height: 40, 
    width:250,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#ccc5b9',
    marginBottom:10,
    paddingHorizontal: 10,
    backgroundColor:'white',
    fontFamily:'Athiti-Regular'
  },
  headerTextStyle:{
    fontFamily:'Athiti-Regular',
    fontSize:30,
    paddingBottom:20
  },
  buttonStyle :{
    width: 150,
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    backgroundColor: '#68b3c8'
  }
};

export default RegisterScreen;


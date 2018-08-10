import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { ipaddr } from '../../globals/Vars';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';



class DeleteMovieModal extends Component {
    static navigatorStyle = {
      navBarHidden: true
    };
    constructor(props){
      super(props);
    }

  _onPresDelete(score) {
    fetch('http://'+ipaddr+':3000/movies/deletemovie', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: this.props.id,
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            // return responseJson.movies;
            if(responseJson.status === 'success'){
                ToastAndroid.show('ลบ Movie สำเร็จ!', ToastAndroid.SHORT);
                this.onDeleteMovieSuccess();
            }else{
              ToastAndroid.show('Add Failed ' + responseJson.status, ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    
  }

  onDeleteMovieSuccess(){
    fetch('http://'+ipaddr+':3000/movies/getallmovies')
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.setupMovies(responseJson);
      Navigation.dismissLightBox();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onCancelAddMovie(){
    Navigation.dismissLightBox();
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.textStyle,{marginBottom:10}]}> คุณต้องการลบหรือไม่? </Text>
        <Text style={[styles.textStyle,{marginBottom:10}]}> {this.props.title} </Text>
        
        <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() =>  this._onPresDelete()}
                    style={{marginBottom:10,width:'100%'}}>
                    <View style={[styles.buttonStyle,{marginTop:10}]}>
                      <Text style={{color: '#FFFFFF'}}>ตกลง</Text>
                    </View>
        </TouchableOpacity>
        <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() =>  this.onCancelAddMovie()}
                    style={{width:'100%'}}>
                    <View style={styles.buttonStyle}>
                      <Text style={{color: '#FFFFFF'}}>ยกเลิก</Text>
                    </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor : 'white',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.4,
    borderRadius: 5,
    padding: 16,

  },
  textStyle :{
    alignSelf: 'center',
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily:'Athiti-SemiBold',

  },
  buttonStyle :{
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    backgroundColor: '#68b3c8'
  }

});
export default DeleteMovieModal;


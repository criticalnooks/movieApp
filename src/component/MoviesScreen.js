import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  ScrollView,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import MovieBox from './MovieBox/MovieBox'


class MoviesScreen extends Component {
  static navigatorStyle = {
     navBarHidden: true,
  };
  constructor(props){
    super(props);
    this.state = {
      isDeleteActived:false
    } 
   
  }
  
  _onPressDeleteButton(){
    if(this.props.usertype === 'MANAGER'){
      if(this.state.isDeleteActived){
        this.setState({isDeleteActived:false});
      }else{
        this.setState({isDeleteActived:true});
        ToastAndroid.show('กรุณาเลือก Movie ที่ต้องการลบ', ToastAndroid.SHORT);
      }
    }else{
      ToastAndroid.show('เฉพาะ MANGAER ที่สามารถลบได้', ToastAndroid.SHORT);
    }
     
  }

  _onPressDeleteMovieBox(id,title) {
    if(this.state.isDeleteActived){
      Navigation.showLightBox({
        screen: 'DeleteMovieModal', // unique ID registered with Navigation.registerScreen
        passProps: {id,title},
        style: {
          backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
        }
      });
    }
  }

  _onPressAddMovie(){
    Navigation.showLightBox({
      screen: 'AddMovieModal', // unique ID registered with Navigation.registerScreen
      style: {
        backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });
  }

  _onPressLogout(){
    this.props.onChangeUsername('');
    this.props.onChangePassword('');
    this.props.setUserType('');
    this.props.navigator.popToRoot({
      animated: true, 
      animationType: 'fade',
    });
  }

  

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}> 
            <View style={{flexDirection: 'row',marginBottom:5}}>
              <TouchableOpacity 
                      activeOpacity={0.7}
                      onPress={() =>  this._onPressAddMovie()}
                      style={{flex:1}}>
                      <View style={styles.buttonStyle}>
                        <Text style={{color: '#FFFFFF'}}>สร้าง</Text>
                      </View>
              </TouchableOpacity>
              <TouchableOpacity 
                      activeOpacity={0.7}
                      onPress={() =>  this._onPressDeleteButton()}
                      style={{flex:1}}>
                      <View style={[styles.buttonStyle,{backgroundColor:'#ff0000'}]}>
                        <Text style={{color: '#FFFFFF'}}>{this.state.isDeleteActived? 'ยกเลิกการลบ':'ลบ'}</Text>
                      </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() =>  this._onPressLogout()}
                    style={{marginBottom:15,width:'100%'}}>
                    <View style={[styles.buttonStyle,{backgroundColor:'#a09f9f'}]}>
                      <Text style={{color: '#FFFFFF'}}>ออกจากระบบ</Text>
                    </View>
            </TouchableOpacity>
                                        {this.props.moviesList.map( (movie,i) => <TouchableWithoutFeedback key={i} onPress={()=>this._onPressDeleteMovieBox(movie.id,movie.title)} >
                                                                                      <View style={[{flex:1,marginBottom:10},this.state.isDeleteActived? {backgroundColor:'#fcbdbd',borderColor:'red',borderWidth:5}:{backgroundColor:'#e2e2e2'}]}>
                                                                                        <MovieBox 
                                                                                                  title={movie.title} 
                                                                                                  year_release={movie.year_release}
                                                                                                  rating={movie.rating}/>
                                                                                      </View>   
                                                                                    </TouchableWithoutFeedback>
                                                                        )}

        </ScrollView> 
      </View>
    );
  }
}

export default MoviesScreen;

const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      flex: 1, 
    },
    indicatorStyle:{
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10
    },
    buttonStyle :{
      padding: 10,
      borderRadius: 7,
      alignItems: 'center',
      backgroundColor: '#68b3c8'
    }
});
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
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';



class AddMovieScreen extends Component {
    static navigatorStyle = {
      navBarHidden: true
    };
    constructor(props){
      super(props);
       this.state = {
        title:'',
        year_release:'',
        rating:''
      } 
    }

  _onPresAdd(score) {
    fetch('http://'+ipaddr+':3000/movies/addmovie', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: this.state.title,
            year_release: this.state.year_release,
            rating: this.state.rating
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.status === 'success'){
                ToastAndroid.show('เพิ่ม Movie สำเร็จ!', ToastAndroid.SHORT);
                this.onAddMovieSuccess();
            }else{
              ToastAndroid.show('Add Failed ' + responseJson.status, ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    
  }

  onAddMovieSuccess(){
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
        <Text style={[styles.textStyle,{marginBottom:10}]}> เพิ่ม Movie </Text>
        <TextInput  style={styles.textInputStyle}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(title) => this.setState({title}) }
            value={this.state.title}
            placeholder='Title'/>

        <TextInput  style={styles.textInputStyle}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(year_release) => this.setState({year_release}) } 
            value={this.state.year_release}
            placeholder='Year Release'/>

        <View style={{flexDirection:'row',borderWidth: 1,borderRadius: 7, borderColor: '#ccc5b9',marginBottom:10}}>
            <Picker
                selectedValue={this.state.rating}
                style={{ height: 40, width: 250 }}
                mode='dropdown'
                prompt='rating'
                onValueChange={(itemValue, itemIndex) => this.setState({rating: itemValue})}>
                <Picker.Item label="กรุณาเลือก Type" value="" />
                <Picker.Item label="G" value="G" />
                <Picker.Item label="PG" value="PG" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="MA" value="MA" />
                <Picker.Item label="R" value="R" />
            </Picker>
       </View>
       <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() =>  this._onPresAdd()}
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
    height: Dimensions.get('window').height * 0.55,
    borderRadius: 5,
    padding: 16,

  },
  textStyle :{
    alignSelf: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily:'Athiti-SemiBold',

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
  buttonStyle :{
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    backgroundColor: '#68b3c8'
  }

});
export default AddMovieScreen;


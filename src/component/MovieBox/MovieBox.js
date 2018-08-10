import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


export default class Box extends Component {
    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.movieBox}>
                        <View style={{ width:120,height:110, flexDirection: 'row',marginTop:10}}>
                            <Image  style={styles.imgStyle} source={require('../../../img/movie-icon.png')}/>
                        </View> 
                        <View style={styles.textView} >
                            <Text style={styles.text}>{this.props.title} ( {this.props.year_release} ) </Text>
                            <Text style={styles.text}>Rating :  {this.props.rating} </Text>
                        </View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 380, 
        height: 130,
        flex: 1, 
        flexDirection: 'row'
    },
    movieBox:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textView: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft:10,

    },
    text: {
        color: 'black',
        fontSize :17,
        fontFamily:'Athiti-Regular',
        fontWeight:'bold'

    },
    imgStyle:{
        flex:10,
        width: '80%',
        height:null,
        resizeMode: 'contain'
   
    }
});

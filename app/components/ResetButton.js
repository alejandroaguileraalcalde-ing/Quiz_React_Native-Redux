import React from 'react';
import {Button, Text, TouchableHighlight, View} from "react-native";

export default class ResetButton extends React.Component{
    render() {
        return(
        <TouchableHighlight  onPress={() =>this.props.onReset()} style={{alignItems:"center", backgroundColor:"black", padding:10, width:90, marginLeft:135, borderRadius:10}} >
            <View>
                <Text style={{color:"white"}}>Reset</Text>
            </View>
        </TouchableHighlight>
        )
    }
}
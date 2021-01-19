import React from 'react';
import {Button, Text, TouchableHighlight, View} from "react-native";
export default class Preguntas extends React.Component{
    render() {
         let quizzes = this.props.quizzes;
        return(quizzes.map((quiz, i)=>{
            let num = i+1;
            let numString = num.toString();
            return(

                   <TouchableHighlight  onPress={() =>this.props.onChangeQuiz(i)} style={{alignItems:"center", backgroundColor:"black", padding:9, borderRadius:30}} >
                       <View>
                           <Text style={{color:"white"}}> {numString} </Text>
                       </View>
                   </TouchableHighlight>

                );

        }))
    }
}
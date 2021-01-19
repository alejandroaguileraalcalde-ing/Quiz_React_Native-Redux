import React from 'react';
import {Button, Image, TextInput, View, Text, Alert} from "react-native";
import {TouchableHighlight} from "react-native";
import {PixelRatio} from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Game extends React.Component{
    render() {
        console.log('Quiz', this.props.quiz);
        var nombreAutor = "";
        var urlAutor = "";
        var urlAttachment = "";
        if(this.props.quiz.author !== null){
            nombreAutor= this.props.quiz.author.username;
            if((this.props.quiz.author.photo!==null)&&(this.props.quiz.author.photo.url!==null))
            urlAutor = this.props.quiz.author.photo.url;
        }
        else{
            nombreAutor= "Sin autor";
            urlAutor = "https://cdn.icon-icons.com/icons2/2367/PNG/512/user_icon_143482.png"
        }

        if((this.props.quiz.attachment!==null)&&(this.props.quiz.attachment.url!==null)){
            urlAttachment= this.props.quiz.attachment.url;
        }
        else{
            urlAttachment = "https://www.flaticon.es/svg/static/icons/svg/545/545676.svg"
        }
        return(
            <View style={{justifyContent:"center"}}>
                <View style={{justifyContent:"center"}} >
                   <Text style={{justifyContent:"center", fontSize:15, marginTop:10, marginBottom:10}}>Creado por: {
                       nombreAutor || "Sin nombre"
                   }</Text>
                    <View>
                        <Image source={{uri: urlAutor}} style ={{width:PixelRatio.getPixelSizeForLayoutSize(100),height:PixelRatio.getPixelSizeForLayoutSize(100), borderRadius:50}} />
                    </View>
                </View>
                <View >
                    <Text style={{fontSize:20, marginTop:10, marginBottom:10, marginLeft:90}}>{this.props.quiz.question}</Text>


                <TextInput type="text"
                       onChangeText={text => this.props.onQuestionAnswer(text)}
                           autoCorrect={false}
                           autocompleteType={"off"}
                       value={this.props.quiz.userAnswer}
                           style={{borderColor:"black", borderWidth:1, backgroundColor:"#0ac6e8"}}
                onSubmitEditing={()=>{
                         //Esto mira si después de escribir le das al intro
                        if((this.props.quiz.id !== this.props.quizzes[this.props.quizzes.length -1].id)&&(this.props.quizzes.length!==0)){
                            this.props.onChangeQuiz(25);
                        }
                        else{
                            this.props.onSubmit();
                        }

                }
                }/>

                    <Image source={{uri:urlAttachment}} style={{width:PixelRatio.getPixelSizeForLayoutSize(300),height:PixelRatio.getPixelSizeForLayoutSize(150), marginTop:5, marginLeft:34, borderRadius:30}}/>
                </View>
                <View style={{flexDirection:"row", justifyContent:"center", marginTop:5}}>

                    <TouchableHighlight  onPress={() =>this.props.onChangeQuiz(26)} style={{alignItems:"center", backgroundColor:"#0ac6e8", padding:10, marginRight:3, borderRadius:10}} disabled={(this.props.quiz.id == this.props.quizzes[0].id)||(this.props.quizzes.length ==0)}>
                        <View>
                        <Text>Anterior</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.onSubmit()} style={{alignItems:"center", backgroundColor:"#0ac6e8", padding:10, marginRight:3, borderRadius:10}}>
                        <View>
                            <Text>Submit</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight  onPress={() => this.props.onChangeQuiz(25)} style={{alignItems:"center", backgroundColor:"#0ac6e8", padding:10, marginRight:3, borderRadius:10}} disabled={(this.props.quiz.id == this.props.quizzes[this.props.quizzes.length -1].id)||(this.props.quizzes.length==0)}>
                        <View>
                            <Text>Siguiente</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight  onPress={() => this.props.navigation.goBack()} style={{alignItems:"center", backgroundColor:"#0ac6e8", padding:10, borderRadius:10}} disabled={(this.props.quiz.id == this.props.quizzes[this.props.quizzes.length -1].id)||(this.props.quizzes.length==0)}>
                        <View>
                            <Text>Menu</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={{flexDirection:"row", justifyContent:"center", marginTop:3}}>

                    <TouchableHighlight  onPress={async () =>{

                            try {
                                const jsonValue = JSON.stringify(this.props.quizzes);
                                await AsyncStorage.setItem('@P5_2020_IWEB:quiz', jsonValue);
                                Alert.alert(
                                    "Guardado Exitoso",
                                    "Las preguntas se han guardado correctamente",
                                    [

                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                    { cancelable: false }
                                );
                            } catch (e) {
                                // saving error
                            }

                    }
                    } style={{alignItems:"center", backgroundColor:"#0ac6e8", padding:10, marginRight:3, borderRadius:10}} >
                        <View>
                            <Text>Save</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.onLoad()} style={{alignItems:"center", backgroundColor:"#0ac6e8", padding:10, marginRight:3, borderRadius:10}}>
                        <View>
                            <Text>Load</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight  onPress={ async () => {
                        try {
                            const jsonValue = JSON.stringify(null);
                            await AsyncStorage.setItem('@P5_2020_IWEB:quiz', jsonValue)
                            Alert.alert(
                                "Borrado Exitoso",
                                "Las preguntas se han borrado correctamente",
                                [

                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                            );
                        } catch (e) {
                            // saving error
                        }

                    }} style={{alignItems:"center", backgroundColor:"#0ac6e8", padding:10, borderRadius:10}} >
                        <View>
                            <Text>Delete</Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </View>
        );
    }
}
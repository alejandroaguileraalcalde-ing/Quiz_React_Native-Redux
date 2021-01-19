

import React, { Component } from 'react';
import {connect} from 'react-redux';
import Game from "./Game";
import Preguntas from "./Preguntas";
import Timer from "./Timer";
import Navbar from "./Navbar";
import {questionAnswer, changeQuiz, submit, initQuizzes, Reset} from "../reducers/actions";
import axios from 'axios';
import ResetButton from "./ResetButton";
import VistaFinal from "./VistaFinal";
import {Image, View, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PixelRatio} from "react-native-web";

class GameScreen extends React.Component {

  constructor (props) {
    super(props);
      this.state = {
          loading: true
      };
  }

  onChangeQuiz = (index) => {
    console.log('BOTON NEXT', index);
    this.props.dispatch(changeQuiz(index));
  }

  onQuestionAnswer = (answer) => {
    this.props.dispatch(questionAnswer(this.props.currentQuiz, answer))
  }
  onSubmit = () =>{
    console.log('Submit APP');
    this.props.dispatch(submit(this.props.quizzes));
  }
  componentDidMount() {
      setTimeout(()=>{
          this.setState({loading: false});
      },2000);
      axios.get('https://core.dit.upm.es/api/quizzes/random10wa?token=75c24188e8a237d4b32d')
        .then(response => {
          this.props.dispatch(initQuizzes(response.data));
        });


  }
  onReset = () =>{
      this.setState({loading:true});
      setTimeout(()=>{
          this.setState({loading: false});
      },2000);
      axios.get('https://core.dit.upm.es/api/quizzes/random10wa?token=75c24188e8a237d4b32d')
        .then(response => {
          this.props.dispatch(initQuizzes(response.data));
        });
    this.props.dispatch(Reset());
    this.props.dispatch(changeQuiz(0));
  }

    onLoad =  async () =>{
        this.setState({loading:true});
        setTimeout(()=>{
            this.setState({loading: false});
        },2000);
        try {
            const jsonValue = await AsyncStorage.getItem('@P5_2020_IWEB:quiz')
             //jsonValue != null ? JSON.parse(jsonValue) : null;
            if(JSON.parse(jsonValue)!==null) {
                Alert.alert(
                    "Carga Exitosa",
                    "Las preguntas se han cargado correctamente",
                    [

                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                this.props.dispatch(initQuizzes(JSON.parse(jsonValue)));
            }
            else{
                Alert.alert(
                    "Error de Carga",
                    "No hay preguntas almacenadas",
                    [

                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );

            }
        } catch(e) {
            // error reading value
        }
        this.props.dispatch(Reset());
        this.props.dispatch(changeQuiz(0));
    }


  render () {
    if(this.props.finished){
      return (
          <View style={{flex:1, justifyContent:"space-between",  backgroundColor:"white"}}>

              <Navbar style={{flex:1, justifyContent:"flex-start"}}/>
          <VistaFinal style={{flex:4, justifyContent:"center"}}
          score = {this.props.score}
          />
          <View style = {{flex:1}}>
          <ResetButton
                  onReset = {this.onReset}
              />
              </View>

                  </View>

      );
    }
    else {
      return (
          <View style={{flex:1, justifyContent:"space-between",  backgroundColor:"white" }}>
              {this.state.loading ? <Image source={{uri:"https://miro.medium.com/max/1158/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"}} style={{width:PixelRatio.getPixelSizeForLayoutSize(300),height:PixelRatio.getPixelSizeForLayoutSize(300), marginLeft:34}} />:
              <View style={{backgroundColor:"white"}}>
                  <Navbar/>
            <View>
              <Timer
                  onSubmit={this.onSubmit}
              />
            </View>
              <View>

            <Game quiz={this.props.quizzes[this.props.currentQuiz]}
                  quizzes = {this.props.quizzes}
                  onQuestionAnswer={this.onQuestionAnswer}
                  onChangeQuiz={this.onChangeQuiz}
                  onSubmit={this.onSubmit}
                  onReset = {this.onReset}
                  onLoad={this.onLoad}
                  navigation={this.props.navigation}
                  style={{justifyContent:"center"}}
            />
            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:50}}>
                    <Preguntas
                  onChangeQuiz={this.onChangeQuiz}
                  quizzes = {this.props.quizzes}
                  style={{flexDirection:"row", justifyContent:"center"}}
              />
            </View>

              </View>
              </View>}
          </View>

      )
    }
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(GameScreen);

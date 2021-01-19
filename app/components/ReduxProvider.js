import { Provider } from 'react-redux';
import GlobalState from '../reducers/reducers';
import { createStore } from 'redux';
import{ NavigationContainer} from'@react-navigation/native';
import{ createStackNavigator} from'@react-navigation/stack';
import React from 'react';

import { quizzes } from "../../assets/mock-data";
import GameScreen from "./GameScreen";
import {View} from "react-native";
import IndexScreen from "./IndexScreen";

export default class ReduxProvider extends React.Component {
    constructor(props){
        super(props);
        this.initialState = {
            score: 0,
            finished: false,
            currentQuiz: 0,
            quizzes: []
        };
        this.store = this.configureStore();
    }
    render() {
        const Stack= createStackNavigator();
        return (
            <Provider store={this.store}>
                <View style={{flex:1, backgroundColor:"white"}}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="                              IndexScreen                             ">
                        <Stack.Screen name="                              IndexScreen                             " component={IndexScreen} />
                        <Stack.Screen name="               GameScreen               " component={GameScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
                </View>

            </Provider>
        );
    }
    configureStore() {
        return createStore(GlobalState, this.initialState);
    }
}
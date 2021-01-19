import { combineReducers} from "redux";
import {CHANGE_QUIZ, QUESTION_ANSWER, SUBMIT, INIT_QUIZZES, RESET} from "./actions";

function score(state = 0, action = {}){
    switch (action.type){
        case SUBMIT:
            console.log('submit score');
            let quizzes = action.payload.quizzes;
            var puntos = 0;
            for(let i=0; i< quizzes.length;i++){
                if(quizzes[i].userAnswer == quizzes[i].answer){
                    puntos++;
                }
            }
            console.log('puntos:',puntos);
            return puntos;

        case RESET:
            return 0;
        default:
            return state;
    }
}

function finished(state = false, action = {}){
    switch (action.type){
        case RESET:
            return false;

        case SUBMIT:
            console.log('submit finnished', state);
            return true;
        default:
            return state;
    }
}

function currentQuiz(state = 0, action = {}){
    switch (action.type){
        case CHANGE_QUIZ:
            let indice = action.payload.index;

            if (indice === 25){
                console.log('State alante', state, indice);
                return state +1;
            }
            else if (indice === 26){
                console.log('State atrás', state, indice);
                return state -1;
            }
            else{
                return indice;
            }


        default:
            return state;
    }
}

function quizzes(state = [], action = {}){
    switch (action.type){
        case QUESTION_ANSWER:
            return state.map((quiz,i) => {
                return{ ...quiz,
                    userAnswer: action.payload.index === i ? action.payload.answer : quiz.userAnswer}
            })
        case INIT_QUIZZES:
            return action.payload.quizzes;

        default:
            return state;
    }
}

const GlobalState = (combineReducers({
    score,
    finished,
    currentQuiz,
    quizzes
}));
export default GlobalState;
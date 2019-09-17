import {combineReducers} from 'redux';
import { reducer } from 'redux-form';

import {quizReducer} from './quizReducer';

export default combineReducers({
    form: reducer,
    quizes: quizReducer
});
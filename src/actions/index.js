import history from '../components/history';
import api from '../api';

export const addQuiz = (quiz, formValues) => async dispatch => {
    history.push('/');

    const data = {title: formValues.title, quiz:[...quiz]};

    const response = await api.post('/quizes',data)
    
    dispatch({type:'ADD_QUIZ', payload:response.data});
}

export const getQuiz = () => async dispatch => {
    
    const response = await api.get('/quizes');
    dispatch({type:'GET_QUIZ', payload:response.data})
}

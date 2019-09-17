export const quizReducer = (state=[],action) => {
    switch(action.type) {
        case 'ADD_QUIZ':
            return [...state, action.payload];
        case 'GET_QUIZ':
            return action.payload;
        default:
            return state;
    }
}
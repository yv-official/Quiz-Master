import React from 'react';
import { Route, Router } from 'react-router-dom';

import Quiz from './Quiz';
import CreateQuiz from './createQuiz';
import QuizRender from './renderQuiz'
import history from './history';

import '../css/createQuiz.css';
import '../css/app.css';
import '../css/quiz.css';
import '../css/renderQuiz.css';

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <Route path='/' exact component={ Quiz} />
                    <Route path='/create' exact component={CreateQuiz} />
                    <Route path ='/quiz/:id' exact component={QuizRender} />
                </Router>
            </div>
        );
    }
}

export default App;
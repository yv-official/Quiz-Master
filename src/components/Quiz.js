import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuiz } from '../actions';

class Quiz extends React.Component {

    componentDidMount() {
        this.props.getQuiz();
    }

    renderQuizList = () => {
        console.log(this.props.quiz.length);
        if(this.props.quiz.length > 0){
              return  this.props.quiz.map( el => {
                  const id = el._id.toString();
                return(
                    <div className='quiz-list'>
                        <span className='quiz-list-title'>{el.title}</span> 
                        <Link to={`/quiz/${id}`}  params={{ testvalue: "hello" }} className='start-link'>
                            <button>Start Quiz</button>
                        </Link>
                    </div>
                );
           });
        }else{
            return <div className='list-no-quiz'><h1>No Quiz Found</h1></div>;
        }
    }

    render() {
        console.log(this.props.quiz);
        return (
            <div className='quiz'>
                <div className='heading'>Quiz Master</div>
                <div className='create-button'>
                    <h1>Welcome to the Quiz Master App</h1>
                    <Link to='/create' className='createQuiz'>
                        <button >Create New Quiz</button>
                    </Link>
                </div>

                <div className='quiz-list-box'>
                    <h1>Quiz List</h1>
                    {this.renderQuizList()}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return { quiz: state.quizes}
}

export default connect(mapStateToProps,
    {
        getQuiz
    })(Quiz);
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {addQuiz} from '../actions';



class CreateQuiz extends React.Component {
    state ={ totalQues: 0 }

    componentDidMount(){
        this.setState({totalQues:this.quiz.length });
    }

   // componentDidUpdate(){
         
   // }

    
    renderInput = ({input, placeholder, type}) => {
        return(
            <div className='field'>
                <input className='text-field' {...input} type={type} placeholder={placeholder} />
            </div>
        );
    }

    renderTextArea = ({input, label }) => {
        return(
            <div className='field'>
                <label className='label'>{label}</label>
                <textarea className='text-field' {...input} ></textarea>
            </div>
        );
    }

    quiz = []


    onSubmit = (formValues) => {
        //console.log(formValues); 
        this.props.addQuiz(this.quiz, formValues);
        this.props.change("title", null);
        
        
        
    }

    onAddQuestion = (formValues) => {
        //console.log(formValues); 
        
        this.quiz = [...this.quiz, formValues];
        console.log(this.quiz);
        this.setState({totalQues:this.quiz.length });
        this.props.change("question", null);
        for(let i =1; i<=4; i++){
            this.props.change(`option${i}`, null);
        }
        this.props.change("correctOption", null);
        
    }

    render() {
        return (
            <div className='quiz-create'>
                <span className='heading'>Create Quiz</span>

                <div className='add-question'>
                    <form className='questions' onSubmit={this.props.handleSubmit(this.onAddQuestion)}>
                        <Field className ='ques-text' name='question' component={this.renderTextArea} label='Question'/> 
                        <Field className='options' name='option1' component={this.renderInput} type='text' placeholder='First Option' />
                        <Field className='options' name="option2" component={this.renderInput} type='text' placeholder='Second Option'/>
                        <Field className='options' name='option3' component={this.renderInput} type='text' placeholder='Third Option'/>
                        <Field className='options' name='option4' component={this.renderInput} type='text' placeholder='Forth Option'/>
                        <Field className='options' name='correctOption' component={this.renderInput} type='text' placeholder='Correct Option'/>
                        <button>Add Question </button>
                    </form>
                </div>

                <div className='add-quiz'>
                    <form className='quiz' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field className='title' name='title' component={this.renderInput} placeholder= 'Title of Quiz'/>
                        <div className='total'>
                            <span className='total-ques-heading'>Total Questions</span> <br />
                            <span className='total-ques'>{this.state.totalQues}</span><br />
                        </div>
                        <button> Submit Quiz </button>
                        
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    
    return {question: state.quizes};
}

const formWrapper =  reduxForm({ form: 'CreateQuiz' })(CreateQuiz);

export default connect(mapStateToProps,
    {
        addQuiz
    }
    )(formWrapper);
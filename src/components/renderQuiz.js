import React from 'react';
import { connect } from 'react-redux';
import { getQuiz } from '../actions';
import { Link } from 'react-router-dom';

class QuizRender extends React.Component{
    
    state = {index: 0, selected: null, score:0, quiz: {}};

    componentDidMount() {
        this.props.getQuiz();
        const id = this.props.match.params.id;
        if(this.props.quizes){
            this.props.quizes.map( el => {
                if(el._id.toString() === id.toString()){
                    console.log(el);
                    this.setState({ quiz: el});
                }
        
            });
        }
    }

    componentDidUpdate(){
        const id = this.props.match.params.id;
        if(Object.entries(this.state.quiz).length === 0 && this.state.quiz.constructor === Object){
            this.props.quizes.map( el => {
                if(el._id.toString() === id.toString()){
                    console.log(el);
                    this.setState({ quiz: el});
                }
        
            });
        }
    }


    Scoring() {
        const correct = this.state.quiz.quiz[this.state.index].correctOption;
        const choice = this.state.selected;
        if(choice) {
            if(correct.toString()===choice.toString()) {
                this.setState({score:this.state.score+1});
            }
        }
        this.setState({selected:null});
        this.setState({index:this.state.index+1});
    }

    onOptionClick(optionNumber) {
        if(this.state.selected===optionNumber) {
            this.setState({selected:null});
        } else {
            this.setState({selected:  optionNumber})
        }
    }

    renderQuiz = ()=> {
        let i = this.state.index;
        if(i===(-10)) {
            return (
                <>
                    <h1> You have Scored {this.state.score} marks in this Quiz</h1>
                    <Link to="/">
                        <button>Get Back to Home</button>
                    </Link>
                </>
            );
        }
        if(this.state.quiz.title){
            if(i>this.state.quiz.quiz.length){
                i=this.state.quiz.quiz.length-1;
                this.setState({index:i})
            }else if(i === this.state.quiz.quiz.length){
               // i=this.state.quiz.quiz.length-1;
               // this.setState({index:i})
                return(
                    <div className='submit-quiz'>
                        <h1>You have Completed this Quiz</h1>
                        <button onClick={()=>this.setState({index:-10})}>Submit Quiz</button>
                    </div>
                    
                );
            }
            const q = this.state.quiz.quiz[i];
                return (
                    <>
                        <div className='render-question'>
                            <h3 className='list-question'>Ques {i+1}:<br /> {q.question}</h3>
                            <button className={`option-button ${ this.state.selected === 1 ? 'current' : null }`} onClick={()=>this.onOptionClick(1)}>{q.option1}</button>
                            <button className={`option-button ${ this.state.selected === 2 ? 'current' : null }`} onClick={()=>this.onOptionClick(2)}>{q.option2}</button>
                            <button className={`option-button ${ this.state.selected === 3 ? 'current' : null }`} onClick={()=>this.onOptionClick(3)}>{q.option3}</button>
                            <button className={`option-button ${ this.state.selected === 4 ? 'current' : null }`} onClick={()=>this.onOptionClick(4)}>{q.option4}</button>
                        </div>
                        <button className='quiz-nav' onClick={()=>this.Scoring()}>{this.state.selected === null? 'Skip & Next' : 'Next'}</button>  
                    </>
                );
        }else return 'loading';
    }
    
    render(){
        console.log(this.state);
        return(
            <div className='quiz-render'>
                <div className='quiz-title'>{this.state.quiz ? this.state.quiz.title : 'loading'}</div>
                {this.renderQuiz()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    
    return {quizes: state.quizes};
}

export default connect(mapStateToProps,{
    getQuiz
})(QuizRender);
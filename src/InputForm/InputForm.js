import React from 'react';
import BtnTask from './../BtnTask/BtnTask';
import './InputForm.css';

const inputForm = (props) => {
    let inputFormClass = "InputForm";
    if (props.isDone) {
        inputFormClass += " InputFormDone";
    }

    return (
        <form className="FormContainer" onSubmit={props.submit}>
            <BtnTask clicked={props.clicked}
            isDone={props.isDone}/>
            <input className={inputFormClass} type="text" placeholder="Create a new todo..."
                onChange={props.setValue} value={props.value} required/>
            <input type="submit" style={{display:'none'}}/>
        </form>
    );
}

export default inputForm;
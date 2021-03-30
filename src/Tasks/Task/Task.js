import React from 'react';
import BtnTask from './../../BtnTask/BtnTask';
import BtnDelete from './../../BtnDelete/BtnDelete';
import './Task.css';

const task = (props) => {
    let taskClass = 'Task';
    if (props.isDone) {
        taskClass += ' TaskDone';
    }

    return (
    <div className="TaskContainer">
        <BtnTask clicked={props.clicked}
        isDone={props.isDone}
        taskId={props.taskId}/>
        <div className={taskClass}>
            {props.taskValue}
        </div>
        <BtnDelete clicked={props.delete}
        taskId={props.taskId}/>
    </div>
    );
};

export default task;
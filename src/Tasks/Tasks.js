import React from 'react';
import Task from './Task/Task';

const tasks = (props) => {
    let tasksArray = [];
    for (let taskId in props.tasks) {
        props.tasks[taskId].id = taskId;
        tasksArray.push(props.tasks[taskId]);
    }
    let tasksComponent = tasksArray.map(task => {
        return <li key={task.id}><Task isDone={task.isDone}
        clicked={props.clicked}
        delete={props.delete}
        taskValue={task.value}
        taskId={task.id}/></li>
    })
    return (
    <div>
        <ul>
            {tasksComponent}
        </ul>
    </div>)
};

export default tasks;
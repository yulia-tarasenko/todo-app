import React from 'react';
import Task from './Task/Task';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const tasks = (props) => {
    let tasksArray = [];
    for (let taskId in props.tasks) {
        props.tasks[taskId].id = taskId;
        tasksArray.push(props.tasks[taskId]);
    }
    tasksArray.sort((prevTask, nextTask) => {
        return prevTask.num - nextTask.num
    });

    let tasksComponent = tasksArray.map(task => {
        return (
            <Draggable key={task.id} draggableId={task.id} index={task.num}>
                {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Task isDone={task.isDone}
                        clicked={props.clicked}
                        delete={props.delete}
                        taskValue={task.value}
                        taskId={task.id}/>
                    </li>
                )}
            </Draggable>
        )
    })
    return (
    <div>
        <DragDropContext onDragEnd={props.onDrag}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {tasksComponent}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    </div>)
};

export default tasks;
import React from 'react';
import './Filter.css';

const filter = (props) => {
    let counter = 0;
    for (let taskKey in props.tasks) {
        if (!props.tasks[taskKey].isDone){
            counter++;
        }
    };

    return (
        <div className="FilterContainer">
            <span>{counter} items left</span>
            <div className="Filter">
                <button className={"BtnFilter " + (props.filterName === 'all' ? 'active' : '')}
                onClick={props.filterAll}>All</button>
                <button className={"BtnFilter " + (props.filterName === 'active' ? 'active' : '')}
                onClick={props.filterActive}>Active</button>
                <button className={"BtnFilter " + (props.filterName === 'completed' ? 'active' : '')}
                onClick={props.filterCompleted}>Completed</button>
            </div>
            <button className="BtnFilter"
            onClick={props.deleteCompleted}>Clear Completed</button>
        </div>
    )
};

export default filter;
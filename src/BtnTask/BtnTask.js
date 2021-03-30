import React from 'react';
import './BtnTask.css';

const btnTask = (props) => {
    let checkBtnClass = "IconCheck IconCheckHover";
    if (props.isDone) {
        checkBtnClass = checkBtnClass.replace("IconCheckHover", "");
        checkBtnClass += "IconCheckDone";
    }

    return (
        <button className="BtnTask" type="button" onClick={() => props.clicked(props.taskId)}>
            <span className={checkBtnClass}></span>
        </button>
    )
};

export default btnTask;
import React from 'react';
import iconcross from './../assets/images/icon-cross.svg';
import './BtnDelete.css';

const btnDelete = (props) => {
    return (
        <button className="BtnDelete" onClick={() => props.clicked(props.taskId)}><img src={iconcross} alt="icon-cross"/></button>
    )
};

export default btnDelete;
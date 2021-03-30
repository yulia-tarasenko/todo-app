import React from 'react';
import iconsun from './../assets/images/icon-sun.svg';
import './BtnChangeMode.css';

const btn = (props) => {
    return (
        <button className="BtnChange"><img src={iconsun} alt="icon-sun"/></button>
    );
}

export default btn;
import React from 'react';
import Logo from './../Logo/Logo';
import BtnChangeMode from './../BtnChangeMode/BtnChangeMode';
import './Header.css';

const header = (props) => {
    return (
        <div className="Header">
            <Logo/>
            {/* <BtnChangeMode/> */}
        </div>
    );
}

export default header;
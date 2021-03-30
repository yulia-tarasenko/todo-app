import React from 'react';
import './Loading.css';

const loading = (props) => {
    return (
        <div className="LoadingContainer">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
};

export default loading;
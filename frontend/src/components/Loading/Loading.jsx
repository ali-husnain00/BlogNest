import React from 'react';
import "./Loading.css"

const Loading = () => {
    return (
       <div className="loading-container">
         <div className = "spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
       </div>
    );
};

export default Loading;

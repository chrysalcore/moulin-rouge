import React from "react";
import '../../assets/styles/Loading.css';

function Loading(): React.JSX.Element {
    return (
        <div className="loading section">
            <img 
                className="loading__img" 
                src={new URL("../../assets/icons/mill.svg", import.meta.url).href} 
                alt="mill icon" 
            />
            <h2 className="loading__text">Loading...</h2>
        </div>
    );
}

export default Loading;

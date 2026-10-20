import React from "react";
import Button from "./Button";
import '../../assets/styles/Error.css';

function RouteError(): React.JSX.Element {
    return (
        <div className="error section">
            <div className="error__text">
                <h2 className="error__title">Something went wrong</h2>
                <p className="error__desc">Please go back to the home page and try again</p>
            </div>
            <Button to={'/'}>Go to Home</Button>
        </div>
    );
}

export default RouteError;

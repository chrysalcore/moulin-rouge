import React from "react";
import '../../assets/styles/Error.css';
import Button from "./Button";

function ErrorMessage({ onRetry }: { onRetry: () => void }): React.JSX.Element {
    return (
        <div className="error section">
            <div className="error__text">
                <h2 className="error__title">We couldn&apos;t load the data</h2>
                <p className="error__desc">Please connect to a network and try again</p>
            </div>
            <Button onClick={onRetry}>Reload</Button>
        </div>
    );
}

export default ErrorMessage;

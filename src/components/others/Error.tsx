import React from "react";
import '../../assets/styles/Error.css';
import CTA from "./CTA";

function Error({ onRetry }: { onRetry: () => void }): React.JSX.Element {
    return (
        <div className="error section">
            <div className="error__text">
                <h2 className="error__title">We couldn&apos;t load the data</h2>
                <p className="error__desc">Please connect to a network and try again</p>
            </div>
            <CTA onClick={onRetry}>Reload</CTA>
        </div>
    );
}

export default Error;

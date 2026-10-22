import React from "react";
import Button from "./Button";
import ErrorNotice from "./ErrorNotice";

function ErrorMessage({ onRetry }: { onRetry: () => void }): React.JSX.Element {
    return (
        <ErrorNotice title="We couldn't load the data" desc="Please connect to a network and try again">
            <Button onClick={onRetry}>Reload</Button>
        </ErrorNotice>
    );
}

export default ErrorMessage;

import React from "react";
import Button from "./Button";
import ErrorNotice from "./ErrorNotice";

function RouteError(): React.JSX.Element {
    return (
        <ErrorNotice title="Something went wrong" desc="Please go back to the home page and try again">
            <Button to={'/'}>Go to Home</Button>
        </ErrorNotice>
    );
}

export default RouteError;

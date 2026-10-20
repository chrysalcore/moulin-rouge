import React from "react";
import Title from '../../others/Title';
import Slogan from './Slogan';

function Firm(): React.JSX.Element {
    return (
        <div className="flex flex-col gap-6">
            <Title variant='hero' />
            <Slogan />
        </div>
    );
}

export default Firm;

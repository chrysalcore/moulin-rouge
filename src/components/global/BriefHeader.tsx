import React from "react";
import { Link } from "react-router-dom";
import Button from "../others/Button";
import type { BriefInfo } from "../../types";

type BriefHeaderProps = {
    info: BriefInfo;
    handleNext: () => void;
    handlePrev: () => void;
}

function BriefHeader({ info, handleNext, handlePrev }: BriefHeaderProps): React.JSX.Element {
    return (
        <header className='flex min-h-160 grow basis-60 flex-col items-center justify-evenly gap-8 text-center'>
            <h2 className='text-3xl font-bold md:text-4xl'>{info.title}</h2>
            <p className='text-lgh'>
                {info.desc}{' '}
                <strong>
                    {info.strong}
                    <Link className='text-com underline underline-offset-4 transition-colors duration-200 hover:text-ctr' to={info.ref}>{info.link}</Link>
                </strong>
            </p>
            <div className='flex items-center gap-6'>
                <Button variant='secondary' onClick={handlePrev}>Prev</Button>
                <Button variant='secondary' onClick={handleNext}>Next</Button>
            </div>
        </header>
    );
}

export default BriefHeader;

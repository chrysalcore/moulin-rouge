import React from "react";
import { Link } from "react-router-dom";
import type { BriefInfo } from "../../types";

type BriefHeaderProps = {
    info: BriefInfo;
    handleNext: () => void;
    handlePrev: () => void;
}

function BriefHeader({ info, handleNext, handlePrev }: BriefHeaderProps): React.JSX.Element {
    return (
        <header className='brief-header'>
            <h2 className='section__title'>{info.title}</h2>
            <p className='section__desc'>
                {info.desc} 
                <strong className='brief__desc-str'>
                    {info.strong} 
                    <Link className='brief__desc-link' to={info.ref}>
                        {info.link}
                    </Link>
                </strong>
            </p>
            <div className='brief-buttons'>
                <button className='brief__button btn' onClick={handlePrev}>
                    Prev
                </button>
                <button className='brief__button btn' onClick={handleNext}>
                    Next
                </button>
            </div>
        </header>
    );
}

export default BriefHeader;

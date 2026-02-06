import React from "react";
import type { Header } from "../../types";

function SectionHeader({ title, desc }: Header): React.JSX.Element {
    return (
        <header className='section-header'>
            <h2 className='section-header__title'>{title}</h2>
            <p className='section-header__desc'>{desc}</p>
        </header>
    );
}

export default SectionHeader;

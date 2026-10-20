import React from "react";
import type { Header } from "../../types";

function SectionHeader({ title, desc }: Header): React.JSX.Element {
    return (
        <header className='flex max-w-xl flex-col items-center gap-4 text-center'>
            <h2 className='text-3xl font-bold md:text-4xl'>{title}</h2>
            {desc && <p className='text-lgh'>{desc}</p>}
        </header>
    );
}

export default SectionHeader;

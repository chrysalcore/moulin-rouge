import React from "react";
import SectionHeader from './SectionHeader';
import type { Header } from '../../types';

const backgrounds = {
    band: 'bg-linear-to-b from-dom via-black/15 to-dom',
    fade: 'bg-linear-to-b from-transparent to-dom',
    solid: 'bg-dom',
};

type SectionProps = {
    children: React.ReactNode;
    header?: Header;
    as?: 'section' | 'article' | 'main' | 'footer';
    background?: keyof typeof backgrounds;
    ref?: React.Ref<HTMLElement>;
}

function Section({ children, header, as: Tag = 'section', background = 'band', ref }: SectionProps): React.JSX.Element {
    return (
        <Tag ref={ref} className={`px-4 py-24 text-ctr ${backgrounds[background]}`}>
            <div className='mx-auto flex w-full max-w-5xl flex-col items-center gap-20'>
                {header && <SectionHeader {...header} />}
                {children}
            </div>
        </Tag>
    );
}

export default Section;

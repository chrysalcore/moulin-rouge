import React from "react";
import SectionHeader from './SectionHeader';
import headers from '../../data/headers';
import type { SectionType } from '../../types';

type SectionProps = {
    children: React.ReactNode;
    type: SectionType;
}

function Section({ children, type }: SectionProps): React.JSX.Element {
    const headerData = headers[type];
    
    return (
        <section className={`${type} section`}>
            <SectionHeader {...headerData} />
            {children}
        </section>
    );
}

export default Section;

import React from "react";
import useCurrent from '../../hooks/useCurrent';
import Section from './Section';
import BriefHeader from './BriefHeader';
import type { BriefInfo } from '../../types';

const sides = {
    left: { layout: 'flex-row-reverse', edge: 'left-0', inset: 'left-2/5' },
    right: { layout: 'flex-row', edge: 'right-0', inset: 'right-2/5' },
};

type ShowcaseProps<T> = {
    info: BriefInfo;
    items: T[];
    side: keyof typeof sides;
    renderItem: (item: T, main: boolean, className: string) => React.ReactNode;
}

function Showcase<T>({ info, items, side, renderItem }: ShowcaseProps<T>): React.JSX.Element {
    const [current, handleNext, handlePrev] = useCurrent();
    const { layout, edge, inset } = sides[side];

    const prev = items[(current - 1 + items.length) % items.length];
    const next = items[(current + 1) % items.length];
    const secondary = `absolute z-10 aspect-square h-2/5 min-h-48 blur-xs ${inset}`;

    return (
        <Section as='article'>
            <div className={`flex w-full flex-wrap justify-between gap-20 ${layout}`}>
                <BriefHeader info={info} handleNext={handleNext} handlePrev={handlePrev} />
                <div className='relative flex min-h-160 grow basis-80'>
                    {renderItem(prev, false, `${secondary} top-0`)}
                    {renderItem(items[current], true, `absolute top-1/2 z-20 aspect-square min-w-full -translate-y-1/2 transition-transform duration-200 hover:scale-110 sm:h-1/2 sm:min-h-60 sm:min-w-0 ${edge}`)}
                    {renderItem(next, false, `${secondary} bottom-0`)}
                </div>
            </div>
        </Section>
    );
}

export default Showcase;

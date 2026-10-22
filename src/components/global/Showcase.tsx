import React from "react";
import useCurrent from '../../hooks/useCurrent';
import Section from './Section';
import BriefHeader from './BriefHeader';
import type { BriefInfo } from '../../types';

const sides = {
    left: { layout: 'flex-row-reverse', edge: 'left-0', inset: 'left-2/5' },
    right: { layout: 'flex-row', edge: 'right-0', inset: 'right-2/5' },
};

type Role = 'main' | 'prev' | 'next' | 'before' | 'after';

function getOffset(index: number, current: number, length: number): number {
    const offset = (index - current + length) % length;
    return offset > length / 2 ? offset - length : offset;
}

function getRole(offset: number): Role {
    if (offset === 0) return 'main';
    if (offset === 1) return 'next';
    if (offset === -1) return 'prev';
    return offset > 0 ? 'after' : 'before';
}

type ShowcaseProps<T> = {
    info: BriefInfo;
    items: T[];
    side: keyof typeof sides;
    renderItem: (item: T, main: boolean, className: string) => React.ReactNode;
}

function Showcase<T>({ info, items, side, renderItem }: ShowcaseProps<T>): React.JSX.Element {
    const [current, handleNext, handlePrev] = useCurrent(items.length);
    const { layout, edge, inset } = sides[side];

    const roles: Record<Role, string> = {
        main: `top-1/2 z-20 h-1/2 min-h-60 -translate-y-1/2 hover:scale-110 ${edge}`,
        prev: `top-0 z-10 h-2/5 min-h-48 blur-xs ${inset}`,
        next: `top-full z-10 h-2/5 min-h-48 -translate-y-full blur-xs ${inset}`,
        before: `pointer-events-none top-0 z-0 h-2/5 min-h-48 -translate-y-full opacity-0 blur-xs ${inset}`,
        after: `pointer-events-none top-full z-0 h-2/5 min-h-48 opacity-0 blur-xs ${inset}`,
    };

    return (
        <Section as='article'>
            <div className={`flex w-full flex-wrap justify-between gap-20 ${layout}`}>
                <BriefHeader info={info} handleNext={handleNext} handlePrev={handlePrev} />
                <div className='relative flex min-h-160 grow basis-80'>
                    {items.map((item, index) => {
                        const role = getRole(getOffset(index, current, items.length));

                        return (
                            <React.Fragment key={index}>
                                {renderItem(item, role === 'main', `absolute aspect-square max-w-full transition-all duration-500 motion-reduce:transition-none ${roles[role]}`)}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}

export default Showcase;

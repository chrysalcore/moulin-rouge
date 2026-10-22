import React from "react";
import type { Event as EventType } from '../../../types';

function Event({ name, discount, date, img, main, className }: EventType & { main: boolean; className: string }): React.JSX.Element {
    const style: React.CSSProperties = {
        backgroundImage: `linear-gradient(to top, #000, #000d 20%, transparent), url(${new URL(`../../../assets/img/${img}`, import.meta.url).href})`,
    };

    return (
        <div className={`flex flex-col justify-end rounded-lg bg-cover bg-center p-8 shadow-card ${className}`} style={style}>
            {main &&
                <>
                    <h3 className='text-2xl font-semibold'>{name}</h3>
                    <strong className='text-lg text-com'>{discount}% discount</strong>
                    <time className='text-lgh'>{date}</time>
                </>
            }
        </div>
    );
}

export default Event;

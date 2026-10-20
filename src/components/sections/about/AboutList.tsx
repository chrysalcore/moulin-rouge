import React from "react";
import data from "../../../data/about";

function AboutList(): React.JSX.Element {
    return (
        <>
            {data.map((item, index) => (
                <div className={`flex w-full flex-wrap items-center justify-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} key={item.name}>
                    <img
                        className='w-full max-w-80 rounded-2xl md:w-80'
                        src={new URL(`../../../assets/img/${item.src}`, import.meta.url).href}
                        alt={item.name}
                    />
                    <p className={`min-w-60 flex-1 text-center text-lgh ${index % 2 === 0 ? 'lg:text-start' : 'lg:text-end'}`}>
                        <strong className='block text-ctr'>{item.strong}</strong>
                        {item.text}
                    </p>
                </div>
            ))}
        </>
    );
}

export default AboutList;

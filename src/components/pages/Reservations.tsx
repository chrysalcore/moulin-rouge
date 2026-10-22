import React from "react";
import { useRef, useEffect } from 'react';
import Section from '../global/Section';
import SectionHeader from '../global/SectionHeader';
import Form from '../others/Form';
import header from '../../data/headers';
import { inputs as data } from '../../data/contact';

const image = new URL('../../assets/img/reserv.webp', import.meta.url).href;

function Reservations(): React.JSX.Element {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, []);

    return (
        <Section as='main' background='fade' ref={ref}>
            <div className='relative isolate flex w-full justify-end'>
                <img className='absolute top-1/2 left-0 -z-10 hidden h-3/5 w-7/10 -translate-y-1/2 rounded-lg object-cover lg:block' src={image} alt='' />
                <section className='flex w-full flex-col items-center gap-12 rounded-r-lg bg-linear-to-b from-surface to-dom px-4 py-12 lg:w-2/5 lg:min-w-100'>
                    <SectionHeader {...header.reservation} />
                    <Form data={data} />
                </section>
            </div>
        </Section>
    );
}

export default Reservations;

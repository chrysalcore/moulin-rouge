import React from "react";
import { useRef, useEffect } from 'react';
import Section from '../global/Section';
import Form from '../others/Form';
import ReservationTicket from '../sections/reservations/ReservationTicket';
import ReservationConfirmation from '../sections/reservations/ReservationConfirmation';
import useReservationForm from '../../hooks/useReservationForm';
import header from '../../data/headers';

function Reservations(): React.JSX.Element {
    const ref = useRef<HTMLElement>(null);
    const { values, errors, reservation, handleChange, handleSubmit, handleReset } = useReservationForm();

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, []);

    return (
        <Section as='main' header={header.reservation} background='fade' ref={ref}>
            <div className='grid w-full items-start gap-8 lg:grid-cols-2'>
                <div className='rounded-2xl bg-surface p-6 sm:p-8'>
                    {reservation ?
                        <ReservationConfirmation reservation={reservation} onReset={handleReset} /> :
                        <Form values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
                    }
                </div>
                <ReservationTicket values={values} confirmed={reservation !== null} />
            </div>
        </Section>
    );
}

export default Reservations;

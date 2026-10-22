import React from "react";
import Button from "../../others/Button";
import formatReservationDate from "../../../helpers/formatReservationDate";
import type { Reservation } from "../../../schemas/reservationSchema";

function ReservationConfirmation({ reservation, onReset }: { reservation: Reservation; onReset: () => void }): React.JSX.Element {
    const date = formatReservationDate(reservation.date);
    const guests = `${reservation.capacity} ${reservation.capacity === 1 ? 'guest' : 'guests'}`;

    return (
        <div className="flex flex-col items-center gap-6 py-8 text-center animate-enter" role="status">
            <h3 className="text-2xl font-bold">Thank you, {reservation.name}!</h3>
            <p className="text-lgh">
                Your table for {guests} is booked for {date?.day} at {date?.time}. We&apos;ll send the details to {reservation.email}.
            </p>
            <Button variant='secondary' onClick={onReset}>Make another reservation</Button>
        </div>
    );
}

export default ReservationConfirmation;

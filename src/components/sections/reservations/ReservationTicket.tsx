import React from "react";
import formatReservationDate from "../../../helpers/formatReservationDate";
import { contact } from "../../../data/contact";
import type { ReservationValues } from "../../../types";

const hours = contact.find(item => item.name === 'Hours')?.text;

function TicketRow({ label, value, wide }: { label: string; value?: string; wide?: boolean }): React.JSX.Element {
    return (
        <div className={wide ? 'col-span-2' : ''}>
            <dt className="text-xs tracking-wider text-lgh/60 uppercase">{label}</dt>
            <dd className={`truncate text-lg font-semibold ${value ? '' : 'text-lgh/30'}`}>{value || '—'}</dd>
        </div>
    );
}

function ReservationTicket({ values, confirmed }: { values: ReservationValues; confirmed: boolean }): React.JSX.Element {
    const date = formatReservationDate(values.date);
    const guests = Number(values.capacity);
    const guestsText = guests > 0 ? `${guests} ${guests === 1 ? 'guest' : 'guests'}` : undefined;

    return (
        <aside className="relative overflow-hidden rounded-2xl bg-linear-to-br from-surface to-dom shadow-card lg:order-first" aria-label="Reservation summary">
            <div className="flex flex-col gap-8 p-8">
                <div className="flex items-baseline justify-between gap-4">
                    <p className="font-display text-xl font-bold">Moulin Rouge</p>
                    <span className="text-xs tracking-widest text-lgh/60 uppercase">Reservation</span>
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                    <TicketRow label="Date" value={date?.day} wide />
                    <TicketRow label="Time" value={date?.time} />
                    <TicketRow label="Guests" value={guestsText} />
                    <TicketRow label="Name" value={values.name.trim()} wide />
                </dl>
            </div>
            <div className="mx-8 border-t-2 border-dashed border-white/15" />
            <p className="p-8 pt-6 text-sm text-lgh/70">Open {hours}</p>
            {confirmed &&
                <span className="absolute top-1/2 right-6 -rotate-12 rounded-md border-2 border-com px-3 py-1 text-sm font-bold tracking-widest text-com uppercase motion-safe:animate-stamp">
                    Confirmed
                </span>
            }
        </aside>
    );
}

export default ReservationTicket;

import React from "react";
import Button from "./Button";
import type { ReservationErrors, ReservationValues } from "../../types";

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: keyof ReservationValues;
    label: string;
    error?: string;
}

function Field({ name, label, error, ...input }: FieldProps): React.JSX.Element {
    const errorId = `${name}-error`;

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-lgh/70" htmlFor={name}>{label}</label>
            <input
                className="rounded-md border border-white/10 bg-dom px-4 py-3 text-ctr outline-none transition-colors duration-200 placeholder:text-lgh/40 focus:border-com focus:ring-2 focus:ring-com/30 aria-invalid:border-com"
                id={name}
                name={name}
                aria-invalid={error !== undefined}
                aria-describedby={error ? errorId : undefined}
                {...input}
            />
            {error && <span className="text-sm text-com" id={errorId}>{error}</span>}
        </div>
    );
}

type FormProps = {
    values: ReservationValues;
    errors: ReservationErrors;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Form({ values, errors, onChange, onSubmit }: FormProps): React.JSX.Element {
    const now = new Date();
    const minDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
            <Field name="name" label="Name" placeholder="John Doe" autoComplete="name" value={values.name} error={errors.name} onChange={onChange} />
            <div className="grid gap-5 sm:grid-cols-3">
                <div className="sm:col-span-2">
                    <Field name="date" label="Date and time" type="datetime-local" min={minDate} value={values.date} error={errors.date} onChange={onChange} />
                </div>
                <Field name="capacity" label="Guests" type="number" inputMode="numeric" min={1} max={20} placeholder="2" value={values.capacity} error={errors.capacity} onChange={onChange} />
            </div>
            <Field name="email" label="Email" type="email" placeholder="johndoe@gmail.com" autoComplete="email" value={values.email} error={errors.email} onChange={onChange} />
            <Button type='submit'>Book my table</Button>
        </form>
    );
}

export default Form;

import React from "react";
import Button from "./Button";
import type { Input } from "../../types/data";

function Input({ name, type, placeholder, isInput }: Input): React.JSX.Element {
    const field = 'border-b border-ctr px-4 py-3 text-ctr';

    return (
        <label className="flex flex-col gap-2" htmlFor={name}>
            <span className="text-sm font-semibold text-lgh/70 capitalize">{name}</span>
            {isInput ?
                <input className={field} type={type} name={name} id={name} placeholder={placeholder} required /> :
                <textarea className={field} name={name} id={name} placeholder={placeholder} rows={6} required />
            }
        </label>
    );
}

function Form({ data }: { data: Input[] }): React.JSX.Element {
    return (
        <form className="flex w-full max-w-sm flex-col gap-2" action="">
            {data.map(item => (
                <Input
                    name={item.name}
                    type={item.type}
                    placeholder={item.placeholder}
                    isInput={item.isInput}
                    key={item.name}
                />
            ))}
            <div className="mt-8 self-center">
                <Button type='submit'>Submit</Button>
            </div>
        </form>
    );
}

export default Form;

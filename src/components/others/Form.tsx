import React from "react";
import CTA from "./CTA";
import type { Input } from "../../types/data";

function Input({ name, type, placeholder, isInput }: Input): React.JSX.Element {
    return (
        <label className="form-field" htmlFor={name}>
            <span className="form-field__text">{name}</span>
            {isInput? 
                <input 
                    className="form-field__input" 
                    type={type} 
                    name={name} 
                    id={name} 
                    placeholder={placeholder} 
                    required 
                /> :
                <textarea 
                    className="form-field__input" 
                    name={name} 
                    id={name} 
                    placeholder={placeholder} 
                    rows={6} 
                    required
                />
            }
        </label>
    );
}

function Form({ data }: {data: Input[]} ): React.JSX.Element {
    return (
        <form className="form" action="">
            {data.map(item => (
                <Input 
                    name={item.name} 
                    type={item.type} 
                    placeholder={item.placeholder} 
                    isInput={item.isInput} 
                    key={item.name} 
                />
            ))}
            <CTA>Submit</CTA>
        </form>
    );
}

export default Form;

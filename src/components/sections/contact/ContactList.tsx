import React from "react";
import { contact as data } from '../../../data/contact';
import type { Contact } from "../../../types";

function ContactItem({ name, href, text }: Contact): React.JSX.Element {
    return (
        <li className="w-full max-w-60 justify-self-center border-t-2 border-com p-4 text-center">
            <h3 className="text-base font-bold text-com">{name}</h3>
            {href ? <a className="text-sm text-lgh transition-colors duration-200 hover:text-com" href={href}>{text}</a> : <p className="text-sm text-lgh">{text}</p>}
        </li>
    );
}

function ContactList(): React.JSX.Element {
    return (
        <ul className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'>
            {data.map(item => (
                <ContactItem {...item} key={item.name} />
            ))}
        </ul>
    );
}

export default ContactList;

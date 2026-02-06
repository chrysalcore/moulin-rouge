import React from "react";
import '../../../assets/styles/Contact.css';
import { contact as data } from '../../../data/contact';
import type { Contact } from "../../../types";

function ContactItem({ name, href, text }: Contact): React.JSX.Element {
    return (
        <li className="contact-list__item">
            <h3 className="contact-list__title">{name}</h3>
            <a className="contact-list__link" href={href}>{text}</a>
        </li>
    );
}

function ContactList(): React.JSX.Element {
    return (
        <ul className='contact-list'>   
            {data.map(item => (
                <ContactItem {...item} key={item.name} />
            ))}             
        </ul>
    );
}

export default ContactList;

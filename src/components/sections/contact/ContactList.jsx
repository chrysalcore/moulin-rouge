import '../../../assets/styles/Contact.css'
import { contact as data } from '../../../data/contact'

function ContactList() {
    return (
        <ul className='contact-list'>   
        {data.map(item => (
            <ContactItem {...item} key={item.name} />
        ))}             
        </ul>
    )
}

function ContactItem({ name, href, text}) {
    return (
        <li className="contact-list__item" key={name}>
            <h3 className="contact-list__title">{name}</h3>
            <a className="contact-list__link" href={href}>{text}</a>
        </li>
    )
}

export default ContactList
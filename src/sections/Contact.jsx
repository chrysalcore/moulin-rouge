import '../assets/styles/Contact.css'

function Contact() {
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [subject, setSubj] = useState('');
    // const [mssg, setMssg] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios_mod.post('user/login/', {name, email, subject, mssg});
    //         if(response.status === 200){
    //             window.alert("SEND SUCCESSFUL")
    //         };
    //     }catch (e){
    //         console.error(e);
    //     };
    // }

    const ctcData = [
        {
            name: 'Number',
            href: 'tel:+5351505492',
            text: '+53 51505492'
        },
        {
            name: 'Email',
            href: 'mailto:moulerouge@gmail.com',
            text: 'moulerouge@gmail.com'
        },
        {
            name: 'Whatsapp',
            href: 'https://wa.me/5351505492',
            text: '+53 51505492'
        },
        {
            name: 'Telegram',
            href: 'https://t.me/alphablue2027',
            text: '+53 51505492'
        },
        {
            name: 'Location',
            href: '',
            text: 'Republica #170, Camaguey Cuba'
        },
        {
            name: 'Horary',
            href: '',
            text: 'Tuesday - Saturday / 10:00 a.m - 8:00 p.m'
        }
    ]

    return (
        <section className='contact section'>
            <header className='section-header'>
                <h2 className='section__title'>Contact Us</h2>
                <p className="section__desc">We have a table waiting for you and us messager ready. Do you prefer a Reservation or a Delivery. Don't spend your time, hurry up!</p>
            </header>
            <ul className='contact-list'>   
            {ctcData.map(item => {
                return (
                    <li className="contact-list__item" key={item.name}>
                        <h3 className="contact-list__title">{item.name}</h3>
                        <a className="contact-list__link" href={item.href}>{item.text}</a>
                    </li>
                )
            })}             
            </ul>
        </section>
    )
}

export default Contact
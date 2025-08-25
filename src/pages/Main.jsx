import { useEffect, useState } from 'react';
import axios_mod from '../axioss';
import './Main.css';
import Head from "./components/Head";
import Footer from "./components/Footer";
import Stars from './components/Stars';

const baseUrl = 'http://localhost:8000/'

function Main() {
    const [evts, setEvts] = useState(null);
    const [courses, setCourses] = useState(null);
    useEffect(() => {
        const load = async () => {
            try {
                let response = await axios_mod.get('main/');
                if(response.status === 200){
                    setEvts(response.data.events)
                    setCourses(response.data.courses)
                }
            }catch (e){
                return (
                    <h1>{e}</h1>
                )
            };
        }
        load();
    }, []);

    if (evts === null || courses === null) {
        return null;
    }
    
    return (
        <>  
            <div className='head-bg'>
                <Head />
                <Index />
            </div>
            <main id='main-root'>
                <div className="blur">
                    <AboutUs />
                    {evts.length === 0 ? <h2 style={{textAlign: 'center', fontWeight: '400', alignContent: 'center', fontSize: '2.5rem', backgroundColor: '#222', color: '#eee'}}>Dont have events to show you in this moment</h2> : <Events data={evts}/>}
                    <CTA />
                    <BestCourses data={courses}/>
                    <div className="sep"></div>
                    <Contact />
                </div>
            </main>
            <Footer />
        </>
    )
}

function Index() {
    return (
        <section id='index-root'>
            <nav id='app-index'>
                <a href='' id='index-au'>
                    <p>Lets know more</p>
                    <strong>ABOUT US</strong>
                </a>
                <a href='#evt' id='index-ev'>
                    <p>Lets see our</p>
                    <strong>EVENTS</strong>
                </a>
                <a href='#bc' id='index-bc'>
                    <p>Explore our</p>
                    <strong>BEST DISHES</strong>
                </a>
                <a href='#ctc' id='index-ct'>
                    <p>Don't still waiting and</p>
                    <strong>CONTACT us</strong>
                </a>
            </nav>
            <h3>Discover an experience that awakens the senses.
                Indulge in authentic flavors, warm atmospheres, and moments that will become memories. <strong>Your next favorite meal is here.</strong></h3>
        </section>
    )
}

function AboutUs() {
    return (
        <>
            <section id="au" className="root">
                <h2>About us</h2>
                <div id="au-fir">
                    <img src="/src/assets/img/link-bc-bg.webp" alt="Recipe Book" />
                    <p><strong>Where tradition and innovation meet in every bite.</strong><br />
                    Since 1980, Moulin Rouge has been more than a place to eat: it's a family legacy. Our story began in a shared passion, and today, we honor those roots with local ingredients and techniques that blend the classic with the avant-garde. We don't just serve dishes; we create experiences that nourish the soul.</p>
                </div>
                <div id="au-sec">
                    <p><strong>More than a restaurant, a home for the community.</strong><br />
                    From our corner of the heart of the city, we're proud to be a space where flavors mingle with laughter, conversation, and shared moments. We work with local producers, support local artists, and celebrate diversity. Because we believe good food unites hearts.</p>
                    <img src="/src/assets/img/link-ct-bg.webp" alt="Family smiling" />
                </div>
                <p>And that's not all, if you want to know more, <strong>check out our <a href="">About Us</a> section!</strong></p>
            </section>
        </>
    )
}

function Events(props) {
    const evts = props.data
    const [img, setImg] = useState(baseUrl + evts[0].img)
    const [dc, setDC] = useState(evts[0].discount*100 + '%')
    const [name, setName] = useState(evts[0].name)
    const [date, setDate] = useState(evts[0].date_init === evts[0].date_end? evts[0].date_init : evts[0].date_init + ' - ' + evts[0].date_end)
    const [img2, setImg2] = useState(evts.length>1? baseUrl + evts[1].img : evts[0])
    const [img3, setImg3] = useState(baseUrl + evts[evts.length-1].img)
    const [id, setID] = useState(0)

    const next = () => {
        if (id < evts.length - 1) setID(id + 1)
        else setID(0)
        change(id)
    }

    const prev = () => {
        if (id > 0) setID(id - 1)
        else setID(evts.length - 1)
        change(id)
    }

    const change = (id) => {
        setDate(evts[id].date_init === evts[id].date_end? evts[id].date_init : evts[id].date_init + ' - ' + evts[id].date_end)
        setDC(evts[id].discount * 100 + '%')
        setName(evts[id].name)
        setImg(baseUrl + evts[id].img)
        setImg2(baseUrl + evts[id===evts.length-1? 0 : id+1].img)
        setImg3(baseUrl + evts[id===0? evts.length-1 : id-1].img)
    }
    
    return (  
        <article className='root' id='evt'>
            <div id="evt-body">
                <div id='evt-header'>
                    <h2>Events</h2>
                    <h3>We transform your dreams into reality, a simple holiday in a incredible experiences. Let us take care of the details: all you have to worry about is getting a place in our grand trip. <strong>Check all our <a href="">events!</a></strong></h3>
                    {evts.length > 1 && <div>
                        <button type="button" onClick={prev}>PREV</button>
                        <button type='button' onClick={next}>NEXT</button>
                    </div>}
                </div>
                <section id='evt-win'>
                    <div className='evt-fr' style={{backgroundImage: "linear-gradient(to top, #0009, #0005), url(" + img2 + ")"}}>
                        <div className='evt-blur'>
                        </div>
                    </div>
                    <div class='blackbg'>
                    <div id='evt-ct' className='evt-fr' style={{backgroundImage: "linear-gradient(#0001, #000c 90%), url(" + img + ")"}}>
                        <h4>{name}</h4>
                        <h5>{dc} discount</h5>
                        <time dateTime="true">{date}</time>
                    </div>
                    </div>
                    <div className='evt-fr' style={{backgroundImage: "linear-gradient(to top, #0009, #0005), url(" + img3 + ")"}}>
                        <div className='evt-blur'>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    )
}

function BestCourses(props) {
    const courses = props.data
    const [img, setImage] = useState(baseUrl + courses[0].img)
    const [name, setName] = useState(courses[0].course)
    const [rating, setRating] = useState(courses[0].rating)
    const [price, setPrice] = useState(courses[0].price + '$')
    const [img2, setImage2] = useState(baseUrl + courses[1].img)
    const [img3, setImage3] = useState(baseUrl + courses[courses.length-1].img)
    const [id, setID] = useState(0)

    const next = () => {
        if (id < courses.length - 1) setID(id + 1)
        else setID(0)
        change(id)
    }

    const prev = () => {
        if (id > 0) setID(id - 1)
        else setID(courses.length - 1)
        change(id)
    }

    const change = (id) => {
        setImage(baseUrl + courses[id].img)
        setName(courses[id].course)
        setRating(courses[id].rating)
        setPrice(courses[id].price + '$')
        setImage3(baseUrl + courses[id===0? courses.length-1 : id-1].img)
        setImage2(baseUrl + courses[id===courses.length-1? 0 : id+1].img)
    }

    return (
        <article className='root' id='bc'>
            <div id="bc-body">
                <section id='bc-win'>
                    <div className='bc-fr' style={{backgroundImage: "linear-gradient(to top, #000, #000a 20%, #0005), url(" + img2 + ")"}}>
                        <div className="bc-blur"></div>
                    </div>
                    <div className="blackbg">
                    <div id='bc-ct' className='bc-fr' style={{backgroundImage: "linear-gradient(to top, black, #000d 20%, transparent), url(" + img + ")"}}>
                        <Stars rating={rating}/>
                        <h4>{name}</h4>
                        <h5>{price}</h5>
                    </div>
                    </div>
                    <div className='bc-fr' style={{backgroundImage: "linear-gradient(to top, #000, #000a 20%, #0005), url(" + img3 + ")"}}>
                        <div className="bc-blur"></div>
                    </div>
                </section>
                <div id='bc-header'>
                    <h2>Best Dishes</h2>
                    <h3>From reinvented classics to bold creations, our menu is a tribute to gastronomy. Do you prefer something light or a burst of indulgence? <strong>There's always a dish on our <a href="">Menu</a> made for you.</strong></h3>
                    <div>
                        <button type="button" onClick={prev}>PREV</button>
                        <button type='button' onClick={next}>NEXT</button>
                    </div>
                </div>
            </div>
        </article>
    )
}

function CTA() {
    return (
        <div id="cta">
            <p>We have a table waiting for you and us messager ready. Do you prefer a <strong><a href="">Reservation</a></strong> or a <strong><a href="">Delivery</a></strong>. Don't spend your time, <strong>hurry up!</strong></p>
        </div>
    )
}

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubj] = useState('');
    const [mssg, setMssg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios_mod.post('user/login/', {name, email, subject, mssg});
            if(response.status === 200){
                window.alert("SEND SUCCESSFUL")
            };
        }catch (e){
            console.error(e);
        };
    }

    return (
        <section className='root' id='ctc'>
            <h2>Contact Us</h2>
            <nav id='ctc-nav'>   
                <div>
                    <h4>Telephone Number</h4>
                    <a href="tel:+5351505492">+53-51505492</a>
                </div>
                <div>
                    <h4>Email</h4>
                    <a href="mailto:moulinrougerestaurant@gmail.com">moulinrougerestaurant@gmail.com</a>
                </div>
                <div>
                    <h4>Location</h4>
                    <a href=''>Republica #170, Camaguey Cuba</a>
                </div>
                <div>
                    <h4>Horary</h4>
                    <a href=""><time dateTime=''>10:00 a.m - 8:00 p.m <br />Tuesday - Saturday</time></a>
                </div>                        
            </nav>
        </section>
    )
}
export default Main
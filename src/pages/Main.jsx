import { useEffect, useState } from 'react';
import axios_mod from '../axioss';
import '../assets/styles/Main.css';
import Head from "../sections/Head";
import Categories from "../sections/Categories";
import Events from '../sections/Events';
import About from '../sections/About';
import Footer from "../sections/Footer";
import Dishes from '../sections/Dishes';
import Contact from '../sections/Contact';
import Reservations from '../sections/Reservations';

const baseUrl = 'http://localhost:8000/'

function Main() {
    // const [evts, setEvts] = useState(null);
    // const [courses, setCourses] = useState(null);
    // useEffect(() => {
    //     const load = async () => {
    //         try {
    //             let response = await axios_mod.get('main/');
    //             if(response.status === 200){
    //                 setEvts(response.data.events)
    //                 setCourses(response.data.courses)
    //             }
    //         }catch (e){
    //             return (
    //                 <h1>{e}</h1>
    //             )
    //         };
    //     }
    //     load();
    // }, []);

    // if (evts === null || courses === null) {
    //     return null;
    // }
    
    return (
        <>  
            <Head />
            <Categories />
            <main className='main'>
                <Events />
                <About />
                <Dishes />
                <Contact />
                <Reservations />
            </main>
            <Footer /> 
        </>
    )
}

export default Main
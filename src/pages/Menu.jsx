import { useEffect, useState } from 'react';
import axios_mod from '../axioss';
import './Menu.css';
import Head from "../sections/Head";
// import Footer from "./components/Footer";
// import Stars from './components/Stars';

function Menu() {
    // const [courses, setCourses] = useState([]);
    // const [cat, setCat] = useState([])
    // const [next, setNext] = useState("")
    // const [prev, setPrev] = useState("")
    // const [url, setURL] = useState('main/courses/')

    // const [id, setId] = useState(0)
    // const [name, setName] = useState("")
    // const [rating, setRating] = useState(0)
    // const [votes, setVotes] = useState(0)
    // const [price, setPrice] = useState(0)
    // const [desc, setDesc] = useState("")
    // const [gram, setGram] = useState(0)
    // const ch = 'main'

    // const change = (id) => {
    //         setImage(courses[id].img)
    //         setName(courses[id].course)
    //         setRating(courses[id].rating)
    //         setVotes(courses[id].ratings_count)
    //         setPrice(courses[id].price + '$')
    //         setGram(courses[id].gramage + "g")
    //         setDesc(courses[id].description)
    //         setId(courses[id].id)
    // }

    // const update = async () => {
    //     try {
    //         const response = await axios_mod.get(url);
    //         if(response.status === 200){
    //             setCourses(response.data.results)
    //             setNext(response.data.next)
    //             setPrev(response.data.previous)

    //             setName(courses[0].course)
    //             setRating(courses[0].rating)
    //             setVotes(courses[0].ratings_count)
    //             setPrice(courses[0].price + '$')
    //             setGram(courses[0].gramage + "g")
    //             setDesc(courses[0].description)
    //         }
    //     }catch (e){
    //         return (
    //             <h1>{e}</h1>
    //         )
    //     };
    // }

    // const load = async () => {
    //     try {
    //         const response = await axios_mod.get('main/categories/')
    //         if(response.status === 200){
    //             setCat(response.data.categories)
    //             update()
    //         }
    //     }catch (e){
    //         return (
    //             <h1>{e}</h1>
    //         )
    //     };
    // }

    // useEffect(() => {
    //     load();
    // }, []);

    // const nextClick = () => {
    //     if (next === null) return
    //     let st = next.slice(next.indexOf(ch))
    //     setURL(st)
    //     update()
    // }

    // const prevClick = () => {
    //     if (prev === null) return
    //     let st = prev.slice(next.indexOf(ch))
    //     setURL(st)
    //     update()
    // }

    return (
        <>
            <div className='head-bg'>
                <Head />
                <div id="head-foot"></div>
            </div>
            {/* {courses != []? (
                <main id='head-main'>
                    <section id='courses'>
                        { courses[id] &&
                            <div id='course'>
                                <div id='course-left'>
                                    <img src={courses[id].img} alt="Actual Course" />
                                </div>
                                <div id='course-right'>
                                    <h2>{courses[id].course}</h2>
                                    <div id='course-rat'>
                                        <Stars rating={courses[id].rating}/>
                                        <h3>{"(" + courses[id].ratings_count + ")"} votes</h3>
                                    </div>
                                    <div>
                                        <p>{courses[id].description}</p>
                                    </div>
                                    <div id='course-pg'>
                                        <h3>{courses[id].gramage}</h3>
                                        <h3>{courses[id].price}</h3>
                                    </div>
                                    <button>
                                        <svg id="buycar-ico" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15">
                                            <path class="content" d="M6,13.5c0,.83-.67,1.5-1.5,1.5s-1.5-.67-1.5-1.5.67-1.5,1.5-1.5,1.5.67,1.5,1.5Z"/>
                                            <path class="content" d="M16,13.5c0,.83-.67,1.5-1.5,1.5s-1.5-.67-1.5-1.5.67-1.5,1.5-1.5,1.5.67,1.5,1.5Z"/>
                                            <path class="content" d="M16,7V1H4c0-.55-.45-1-1-1H0v1h2l.75,6.44c-.46.37-.75.93-.75,1.56,0,1.1.9,2,2,2h12v-1H4c-.55,0-1-.45-1-1h0s13-2,13-2Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        }
                        <div id='course-buttons'>
                            <button onClick={prevClick}>Prev</button>
                            <nav>
                                { courses[0] && <button style={{backgroundImage: "linear-gradient(#0005, #0005), url(" + courses[0].img + ")"}}>
                                    <h3>{courses[0].id >= 10? courses[0].id : "0" + courses[0].id}</h3>
                                </button>}
                                { courses[1] && <button style={{backgroundImage: "linear-gradient(#0005, #0005), url(" + courses[1].img + ")"}}>
                                    <h3>{courses[1].id >= 10? courses[1].id : "0" + courses[1].id}</h3>
                                </button>}
                                { courses[2] && <button style={{backgroundImage: "linear-gradient(#0005, #0005), url(" + courses[2].img + ")"}}>
                                    <h3>{courses[2].id >= 10? courses[2].id : "0" + courses[2].id}</h3>
                                </button>}
                                { courses[3] && <button style={{backgroundImage: "linear-gradient(#0005, #0005), url(" + courses[3].img + ")"}}>
                                    <h3>{courses[3].id >= 10? courses[3].id : "0" + courses[3].id}</h3>
                                </button>}
                                { courses[4] && <button style={{backgroundImage: "linear-gradient(#0005, #0005), url(" + courses[4].img + ")"}}>
                                    <h3>{courses[4].id >= 10? courses[4].id : "0" + courses[4].id}</h3>
                                </button>}
                            </nav>
                            <button onClick={nextClick}>Next</button>
                        </div>
                    </section>
                    <aside id='categories'>
                        <h3>Categories</h3>
                        <nav>

                        </nav>
                    </aside>
                </main>
            ) : (<h1>Lo siento, no hay platos para mostrar</h1>)}
            <Footer /> */}
        </>
    )
}

export default Menu;
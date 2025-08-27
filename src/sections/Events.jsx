import '../assets/styles/Events.css'

function Events() {
    // const evts = props.data
    // const [img, setImg] = useState(baseUrl + evts[0].img)
    // const [dc, setDC] = useState(evts[0].discount*100 + '%')
    // const [name, setName] = useState(evts[0].name)
    // const [date, setDate] = useState(evts[0].date_init === evts[0].date_end? evts[0].date_init : evts[0].date_init + ' - ' + evts[0].date_end)
    // const [img2, setImg2] = useState(evts.length>1? baseUrl + evts[1].img : evts[0])
    // const [img3, setImg3] = useState(baseUrl + evts[evts.length-1].img)
    // const [id, setID] = useState(0)

    // const next = () => {
    //     if (id < evts.length - 1) setID(id + 1)
    //     else setID(0)
    //     change(id)
    // }

    // const prev = () => {
    //     if (id > 0) setID(id - 1)
    //     else setID(evts.length - 1)
    //     change(id)
    // }

    // const change = (id) => {
    //     setDate(evts[id].date_init === evts[id].date_end? evts[id].date_init : evts[id].date_init + ' - ' + evts[id].date_end)
    //     setDC(evts[id].discount * 100 + '%')
    //     setName(evts[id].name)
    //     setImg(baseUrl + evts[id].img)
    //     setImg2(baseUrl + evts[id===evts.length-1? 0 : id+1].img)
    //     setImg3(baseUrl + evts[id===0? evts.length-1 : id-1].img)
    // }
    
    return (  
        <article className='events section' id='event'>
            <header className='events-header'>
                <h2 className='section__title'>Events</h2>
                <p className='section__desc'>We transform your dreams into reality, a simple holiday in a incredible experiences. Let us take care of the details: all you have to worry about is getting a place in our grand trip. <a className='events__desc-link'>Check all our events!</a></p>
                <div className='events-buttons'>
                    <button className='events__button' >Prev</button>
                    <button className='events__button' >Next</button>
                </div>
            </header>
            <section className='events-content'>
                <div className='events-frame' style={{backgroundImage: "linear-gradient(to top, #0006, #0003), url('/src/assets/img/valentin.png')"}}></div>
                <div className='events-main' style={{backgroundImage: "linear-gradient(#0001, #000c 90%), url('/src/assets/img/christmas.jpg')"}}>
                    <h3 className='events-main__title'>San Valentin Day</h3>
                    <strong className='events-main__discount'>10% discount</strong>
                    <time className='events-main__date'>14/2/2025</time>
                </div>
                <div className='events-frame' style={{backgroundImage: "linear-gradient(to top, #0006, #0003), url('/src/assets/img/halloween.jpg')"}}></div>
            </section>
        </article>
    )
}

export default Events
import '../assets/styles/Dishes.css'
import Stars from '../components/Stars'

function Dishes() {
    // const courses = props.data
    // const [img, setImage] = useState(baseUrl + courses[0].img)
    // const [name, setName] = useState(courses[0].course)
    // const [rating, setRating] = useState(courses[0].rating)
    // const [price, setPrice] = useState(courses[0].price + '$')
    // const [img2, setImage2] = useState(baseUrl + courses[1].img)
    // const [img3, setImage3] = useState(baseUrl + courses[courses.length-1].img)
    // const [id, setID] = useState(0)

    // const next = () => {
    //     if (id < courses.length - 1) setID(id + 1)
    //     else setID(0)
    //     change(id)
    // }

    // const prev = () => {
    //     if (id > 0) setID(id - 1)
    //     else setID(courses.length - 1)
    //     change(id)
    // }

    // const change = (id) => {
    //     setImage(baseUrl + courses[id].img)
    //     setName(courses[id].course)
    //     setRating(courses[id].rating)
    //     setPrice(courses[id].price + '$')
    //     setImage3(baseUrl + courses[id===0? courses.length-1 : id-1].img)
    //     setImage2(baseUrl + courses[id===courses.length-1? 0 : id+1].img)
    // }

    return (
        <article className='dishes section'>
            <section className='dishes-content'>
                <div className='dishes-frame' style={{backgroundImage: "linear-gradient(to top, #000, #000a 20%, #0005), url('/src/assets/img/fish.jpg')"}}></div>
                <div className='dishes-main' style={{backgroundImage: "linear-gradient(to top, #000, #000d 20%, transparent), url('/src/assets/img/head-bg.jpg')"}}>
                    <Stars rating={4.7}/>
                    <h3 className='dishes-main__title'>Hawaiian Pizza</h3>
                    <strong className='dishes-main__price'>$5.99</strong>
                    <button className='dishes-main__button'>Order Now</button>
                </div>
                <div className='dishes-frame' style={{backgroundImage: "linear-gradient(to top, #000, #000a 20%, #0005), url('/src/assets/img/cost.jpg')"}}></div>
            </section>
            <header className='dishes-header'>
                <h2 className='section__title'>Best Dishes</h2>
                <p className='section__desc'>From reinvented classics to bold creations, our menu is a tribute to gastronomy. Do you prefer something light or a burst of indulgence? <strong className='dishes__desc-str'>There's always a dish on <a className='dishes__desc-link' href="">our Menu</a> made for you.</strong></p>
                <div className='dishes-buttons'>
                    <button className='dishes__button'>Prev</button>
                    <button className='dishes__button'>Next</button>
                </div>
            </header>
        </article>
    )
}

export default Dishes
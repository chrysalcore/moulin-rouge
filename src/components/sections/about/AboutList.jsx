import "../../../assets/styles/About.css";
import data from "../../../data/about";

function AboutList() {
    return (
        <>
            {data.map(item => (
                <div className="about-sect" key={item.name}>
                    <img className='about__img' src={new URL(`../../../assets/img/${item.src}`, import.meta.url)} alt={item.name} />
                    <p className="about__text"><strong>{item.strong}</strong>{item.text}</p>
                </div>
            ))}
        </>
    )
}

export default AboutList
import "../assets/styles/About.css";

function About() {
    return (
        <section id="au" className="about section">
            <h2 className="section__title">About us</h2>
            <div className="about-st">
                <img className='about__img' src={new URL("../assets/img/au-first.webp", import.meta.url)} alt="Recipe Book" />
                <p className="about__text"><strong>Where tradition and innovation meet in every bite.</strong>
                Since 1980, Moulin Rouge has been more than a place to eat: it's a family legacy. Our story began in a shared passion, and today, we honor those roots with local ingredients and techniques that blend the classic with the avant-garde. We don't just serve dishes; we create experiences that nourish the soul.</p>
            </div>
            <div className="about-nd">
                <p className="about__text"><strong>More than a restaurant, a home for the community.</strong>
                From our corner of the heart of the city, we're proud to be a space where flavors mingle with laughter, conversation, and shared moments. We work with local producers, support local artists, and celebrate diversity. Because we believe good food unites hearts.</p>
                <img className='about__img' src={new URL("../assets/img/comunnity.jpg", import.meta.url)} alt="Family smiling" />
            </div>
            <button className="about__cta">Show More</button>
        </section>
    )
}

export default About
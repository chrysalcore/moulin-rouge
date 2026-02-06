import React from "react";
import "../../../assets/styles/About.css";
import data from "../../../data/about";

function AboutList(): React.JSX.Element {
    return (
        <>
            {data.map(item => (
                <div className="about-sect" key={item.name}>
                    <img 
                        className='about__img' 
                        src={new URL(`../../../assets/img/${item.src}`, import.meta.url).href} 
                        alt={item.name} 
                    />
                    <p className="about__text">
                        <strong>{item.strong}</strong>
                        {item.text}
                    </p>
                </div>
            ))}
        </>
    );
}

export default AboutList;

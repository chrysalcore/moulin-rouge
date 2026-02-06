import React from "react";
import Firm from '../../others/Firm';
import SocialInfo from '../../others/SocialInfo';
import '../../../assets/styles/Hero.css';

function Hero(): React.JSX.Element {
    return (
        <section className='hero' id='hero'>
            <Firm />
            <SocialInfo />
        </section>
    );
}

export default Hero;

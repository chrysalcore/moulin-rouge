import React from "react";
import Firm from './Firm';
import SocialInfo from '../../others/SocialInfo';

function Hero(): React.JSX.Element {
    return (
        <section className='mx-auto flex min-h-[min(100dvh,50rem)] w-full max-w-5xl flex-col items-center justify-evenly gap-12 px-4 py-12 text-center text-ctr lg:flex-row lg:justify-between lg:py-0 lg:text-left' id='hero'>
            <Firm />
            <SocialInfo variant='hero' />
        </section>
    );
}

export default Hero;

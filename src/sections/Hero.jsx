import Firm from '../components/Firm'
import SocialInfo from '../components/SocialInfo'
import '../assets/styles/Hero.css'

function Hero() {
    return (
        <section className='hero'>
            <Firm />
            <SocialInfo />
        </section>
    )
}

export default Hero
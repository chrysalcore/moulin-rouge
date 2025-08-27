import Nav from "../components/Nav";
import SocialInfo from "../components/SocialInfo";
import "../assets/styles/Footer.css";

function Footer() {
    const sectNav = [
        {
            href: '/',
            text: 'Home'
        },
        {
            href: '/menu',
            text: 'Menu'
        },
        {
            href: '/',
            text: 'Services'
        },
        {
            href: '/',
            text: 'Events'
        },
        {
            href: '/',
            text: 'About Us'
        }
    ]

    const ctcNav = [
        {
            href: 'tel:+5351505492',
            text: '+53 51505492'
        },
        {
            href: 'mailto:moulerouge@gmail.com',
            text: 'moulerouge@gmail.com'
        },
        {
            href: '',
            text: 'Republica #170, Camaguey Cuba'
        },
        {
            href: '',
            text: 'Tuesday - Saturday / 10:00 a.m - 8:00 p.m'
        }
    ]

    const legcNav = [
        {
            href: '/',
            text: 'Privacy Politics'
        },
        {
            href: '/menu',
            text: 'Therms and Conditions'
        },
        {
            href: '/menu',
            text: 'Legal Advicements'
        }
    ]

    return (
        <footer className="footer section">
            <div className="footer-layout">
                <section className="footer-nav">
                    <h3 className="footer-nav__title">Sections</h3>
                    <Nav navDetails={sectNav} />
                </section>
                <section className="footer-nav">
                    <h3 className="footer-nav__title">Services</h3>
                    <Nav navDetails={ctcNav} />
                </section>
                <section className="footer-nav">
                    <h3 className="footer-nav__title">Legacy</h3>
                    <Nav navDetails={legcNav} />
                </section>
                <section className="footer-firm">
                    <img className="footer-firm__logo" src="/src/assets/icons/big-logo.svg" alt="Main Logo"/>
                    <h2 className="footer-firm__title">Moulin<br />Rouge<span>Restaurant</span></h2>
                </section>
            </div>
            <nav className="footer-sm">
                <SocialInfo />
            </nav>
            <div className="footer-rights">
                <small className="footer-rights__copy">&copy;All Rights Reserved 2025</small>
                <small className="footer-rights__auth">Powered by <a href="">Chrysal Core</a></small>
            </div>
        </footer>
    )
}

export default Footer
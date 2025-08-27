import Nav from '../components/Nav'
import '../assets/styles/Header.css'

function Header() {
    const sectNav = [
        {
            href: '/',
            text: 'Home',
            isSelected: true
        },
        {
            href: '/menu',
            text: 'Menu',
            isSelected: false
        },
        {
            href: '/',
            text: 'Services',
            isSelected: false
        },
        {
            href: '/',
            text: 'Events',
            isSelected: false
        },
        {
            href: '/',
            text: 'About Us',
            isSelected: false
        }
    ]

    return (
        <section className='header'>
            <img className='header__logo' src="/public/logo.svg" alt="main icon"/>
            <Nav navDetails={sectNav} />
            <div className='header-buttons'>
                <button className='header__button-log'>Login</button>
                <button className='header__button-user'>
                    <svg className='user-icon' data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.47 20.96">
                        <path className="content" d="M17.47,17.55c-.03,1.8-1.33,3.2-3.12,3.37-.03,0-.07-.01-.08.04H3.14c-.25-.11-.53-.12-.8-.2-1.28-.41-2.2-1.51-2.3-2.85-.14-1.71.06-3.38.69-4.97.4-.99.98-1.84,1.96-2.35.59-.32,1.22-.45,1.88-.47.23,0,.44.1.63.22.34.21.67.44,1.02.64.99.59,2.04.88,3.2.69.65-.11,1.27-.34,1.84-.69.28-.18.57-.35.84-.55.41-.3.87-.34,1.35-.27,1.38.21,2.35.96,3,2.18.56,1.06.8,2.2.94,3.37.07.62.08,1.23.08,1.84Z"/>
                        <path className="content" d="M13.65,5.05c.01,2.81-2.32,5.06-5.06,5.05-2.81-.01-5.06-2.33-5.04-5.06C3.57,2.24,5.82,0,8.62,0c2.78.01,5.04,2.28,5.03,5.05Z"/>
                    </svg>
                </button>
            </div>
        </section>
    )
}

export default Header
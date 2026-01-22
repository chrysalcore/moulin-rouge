import Nav from "../../others/Nav";
import navData from "../../../data/navigation";
import { contact as ctcData} from '../../../data/contact'
import Title from "../../others/Title";

function FooterContent() {
    return (
        <div className="footer-layout">
            <section className="footer-nav">
                <h3 className="footer-nav__title">Pages</h3>
                <Nav data={navData} />
            </section>
            <section className="footer-nav">
                <h3 className="footer-nav__title">Contact</h3>
                <FooterList data={ctcData} />
            </section>
            <section className="footer-firm">
                <Title />
            </section>
        </div>
    )
}

function FooterList({ data }) {
    return (
        <ul className="nav-list">
            {data.map(item => {
                return (
                    <li className="nav-list__item" key={item.text}>
                        <a href={item.href} className='nav-list__link' >{item.text}</a>
                    </li>
                )
            })}
        </ul>
    )
}

export default FooterContent
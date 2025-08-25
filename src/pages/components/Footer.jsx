import "./Footer.css";

function Footer() {
    return (
        <footer className="footer-root">
            <div className="footer-layout">
                <section className="footer-firm">
                    <div>
                        <img src="/src/assets/icons/big-logo.svg" alt="Main Logo"/>
                        <h2>Moulin Rouge <span>Restaurant</span></h2>
                    </div>
                    <p>Each dish has a story to tell you and new experience to share</p>
                </section>
                <section className="footer-nav">
                    <h3>Services</h3>
                    <nav>
                        <a href="http://">Reservation</a>
                        <a href="http://">Delivery</a>
                    </nav>
                </section>
                <section className="footer-nav">
                    <h3>Pages</h3>
                    <nav>
                        <a href="http://">Home</a>
                        <a href="http://">Menu</a>
                        <a href="http://">Events</a>
                        <a href="http://">Contact</a>
                    </nav>
                </section>
                <section className="footer-therms">
                    <h3>Legacy</h3>
                    <nav>
                        <a href="">Privacy Politics</a>
                        <a href="">Therms and Conditions</a>
                        <a href="">About Us</a>
                    </nav>
                </section>
            </div>
            <nav className="footer-sm">
                <a href="http://">
                    <svg id="whatsapp-icon" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.07 16">
                        <path class="content" d="M3.65,14.71l.29.17c1.23.73,2.65,1.11,4.09,1.11h0c4.43,0,8.03-3.59,8.04-8,0-2.14-.83-4.14-2.35-5.66-1.52-1.51-3.54-2.34-5.68-2.34C3.6,0,0,3.59,0,8c0,1.51.42,2.98,1.23,4.25l.19.3-.81,2.95,3.04-.79ZM3.97,3.86c.22-.24.48-.3.64-.3s.32,0,.46,0c.15,0,.35-.06.55.41.2.48.68,1.66.74,1.79.06.12.1.26.02.42-.08.16-.12.26-.24.4s-.25.31-.36.42c-.12.12-.25.25-.11.49s.63,1.03,1.34,1.66c.92.82,1.7,1.07,1.94,1.19.24.12.38.1.52-.06.14-.16.61-.7.77-.94.16-.24.32-.2.55-.12.22.08,1.41.66,1.65.78h0c.24.12.4.18.46.29.06.1.06.58-.14,1.14-.2.56-1.17,1.07-1.63,1.14-.42.06-.94.09-1.52-.09-.35-.11-.8-.26-1.38-.51-2.42-1.04-4-3.47-4.13-3.63-.12-.16-.99-1.3-.99-2.49s.63-1.77.85-2.01Z"/>
                    </svg>
                </a>
                <a href="">
                    <svg id="telegram-icon" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path class="content" d="M8,0C3.58,0,0,3.58,0,8s3.58,8,8,8,8-3.58,8-8S12.42,0,8,0ZM11.93,5.48l-1.31,6.18c-.09.44-.36.54-.73.34l-2-1.48-.96.93c-.11.11-.2.2-.4.2-.26,0-.22-.1-.3-.34l-.68-2.24-1.98-.62c-.43-.13-.43-.43.1-.63l7.71-2.98c.35-.16.69.08.56.62Z"/>
                    </svg>
                </a>
                <a href="">
                    <svg id="instagram-icon" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.02 14">
                        <path class="content" d="M13.47,2.15C12.64.75,11.41.02,9.78,0,7.93,0,6.07,0,4.22,0,3.43,0,2.69.19,2.02.62.69,1.47.01,2.69,0,4.26,0,6.09,0,7.91,0,9.73c0,.19,0,.38.03.56.26,2.13,2.05,3.71,4.19,3.71h5.58c.18,0,.36,0,.54-.03,2.11-.29,3.65-2.03,3.67-4.16.01-.93,0-1.87,0-2.81v-2.81c0-.73-.17-1.41-.54-2.04ZM7.02,10.45c-1.87-.01-3.42-1.58-3.41-3.45.01-1.91,1.57-3.46,3.47-3.45,1.9.01,3.44,1.56,3.43,3.46,0,1.92-1.56,3.45-3.49,3.44ZM10.71,4.14c-.46,0-.83-.38-.82-.83s.38-.82.84-.81c.45.01.81.38.81.83-.01.45-.38.82-.83.81Z"/>
                        <path class="content" d="M7.09,4.8c-1.22-.01-2.22.97-2.23,2.19-.01,1.21.98,2.21,2.19,2.22,1.22,0,2.22-.97,2.23-2.19,0-1.21-.97-2.21-2.19-2.22Z"/>
                    </svg>
                </a>
                <a href="">
                    <svg id="facebook-icon" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path class="content" d="M14.5,0H1.5C.67,0,0,.67,0,1.5v13c0,.82.67,1.5,1.5,1.5h6.5v-7h-2v-2h2v-1c0-1.65,1.35-3,3-3h2v2h-2c-.55,0-1,.45-1,1v1h3l-.5,2h-2.5v7h4.5c.83,0,1.5-.68,1.5-1.5V1.5c0-.83-.67-1.5-1.5-1.5Z"/>
                    </svg>
                </a>
            </nav>
            <small>Thank's for visit</small>
            <small>&copy;2025 All Rights Reserved</small>
        </footer>
    )
}

export default Footer
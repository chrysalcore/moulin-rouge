import React from "react";
import "../../../assets/styles/Footer.css";

function Footer({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <footer className="footer section">
            {children}
        </footer>
    );
}

export default Footer;

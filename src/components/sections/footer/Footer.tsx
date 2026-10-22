import React from "react";
import Section from "../../global/Section";

function Footer({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <Section as='footer' background='solid'>
            {children}
        </Section>
    );
}

export default Footer;

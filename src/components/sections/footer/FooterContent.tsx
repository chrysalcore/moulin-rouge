import React from "react";
import Nav from "../../others/Nav";
import navData from "../../../data/navigation";
import { contact as ctcData } from '../../../data/contact';
import Title from "../../others/Title";
import type { Contact } from "../../../types/data";

function FooterList({ data }: { data: Contact[] }): React.JSX.Element {
    return (
        <ul className="flex flex-col items-center gap-2 text-center">
            {data.map(item => (
                <li key={item.text}>
                    <a href={item.href}>{item.text}</a>
                </li>
            ))}
        </ul>
    );
}

function FooterNav({ title, children }: { title: string; children: React.ReactNode }): React.JSX.Element {
    return (
        <section className="flex w-40 max-w-full flex-col items-center gap-6 border-t border-com py-4 text-sm">
            <h3 className="text-center font-semibold text-com">{title}</h3>
            {children}
        </section>
    );
}

function FooterContent(): React.JSX.Element {
    return (
        <div className="flex w-full flex-wrap justify-evenly gap-8">
            <FooterNav title="Pages">
                <Nav data={navData} variant='footer' />
            </FooterNav>
            <FooterNav title="Contact">
                <FooterList data={ctcData} />
            </FooterNav>
            <section className="flex w-40 max-w-full items-center justify-center">
                <Title variant='footer' />
            </section>
        </div>
    );
}

export default FooterContent;

import React from "react";
import Section from "../global/Section";

function ErrorNotice({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }): React.JSX.Element {
    return (
        <Section>
            <div className="flex flex-col items-center gap-8 text-center" role="alert">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl">{title}</h2>
                    <p className="text-lgh">{desc}</p>
                </div>
                {children}
            </div>
        </Section>
    );
}

export default ErrorNotice;

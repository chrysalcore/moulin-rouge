import React from "react";
import Section from "../global/Section";

const mill = new URL("../../assets/icons/mill.svg", import.meta.url).href;

function Loading(): React.JSX.Element {
    return (
        <Section>
            <div className="flex items-center gap-4" role="status">
                <img className="size-12 animate-spin-slow motion-reduce:animate-none" src={mill} alt="" />
                <p className="text-3xl font-bold">Loading...</p>
            </div>
        </Section>
    );
}

export default Loading;

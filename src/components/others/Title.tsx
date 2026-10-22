import React from "react";

const logo = new URL("../../assets/icons/big-logo.svg", import.meta.url).href;

const variants = {
    hero: {
        Tag: 'h1',
        layout: 'flex flex-col gap-10 lg:flex-row lg:items-end',
        logo: 'hidden w-32 animate-enter lg:block',
        text: 'text-6xl text-ctr enter-delay-150 animate-enter sm:text-7xl',
        subtitle: 'text-4xl',
    },
    footer: {
        Tag: 'p',
        layout: 'flex items-end gap-4',
        logo: 'w-14',
        text: 'text-3xl text-ctr',
        subtitle: 'text-base',
    },
} as const;

function Title({ variant }: { variant: keyof typeof variants }): React.JSX.Element {
    const { Tag, layout, logo: logoClass, text, subtitle } = variants[variant];

    return (
        <div className={layout}>
            <img className={logoClass} src={logo} alt="" />
            <Tag className={`font-display leading-none font-bold tracking-wide ${text}`}>
                Moulin<br />Rouge
                <span className={`block font-normal tracking-normal text-com uppercase ${subtitle}`}>Restaurant</span>
            </Tag>
        </div>
    );
}

export default Title;

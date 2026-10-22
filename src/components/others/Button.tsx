import React from "react";
import { Link } from "react-router-dom";

const variants = {
    primary: 'bg-com text-white',
    secondary: 'bg-ctr text-black',
    outline: 'border border-com text-ctr',
};

type ButtonProps = {
    children: React.ReactNode;
    variant?: keyof typeof variants;
    to?: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
}

function Button({ children, variant = 'primary', to, type = 'button', onClick }: ButtonProps): React.JSX.Element {
    const className = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm px-8 py-2 font-bold ${variants[variant]}`;

    if (to !== undefined) {
        return <Link className={className} to={to}>{children}</Link>;
    }

    return <button className={className} type={type} onClick={onClick}>{children}</button>;
}

export default Button;

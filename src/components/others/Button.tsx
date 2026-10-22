import React from "react";
import { Link } from "react-router-dom";

const variants = {
    primary: 'bg-com text-white hover:brightness-110',
    secondary: 'bg-ctr text-black hover:bg-white',
    outline: 'border border-com text-ctr hover:bg-com/15',
};

type ButtonProps = {
    children: React.ReactNode;
    variant?: keyof typeof variants;
    to?: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
}

function Button({ children, variant = 'primary', to, type = 'button', onClick }: ButtonProps): React.JSX.Element {
    const className = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm px-8 py-2 font-bold transition duration-200 ease-smooth active:scale-95 ${variants[variant]}`;

    if (to !== undefined) {
        return <Link className={className} to={to} viewTransition>{children}</Link>;
    }

    return <button className={className} type={type} onClick={onClick}>{children}</button>;
}

export default Button;

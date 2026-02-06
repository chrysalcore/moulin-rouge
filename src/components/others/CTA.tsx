import React from "react";

type CTAProps = {
    children: React.ReactNode;
    onClick?: () => void;
}

function CTA({ children, onClick }: CTAProps): React.JSX.Element {
    return (
        <div className="cta">
            <button className="cta__btn btn" onClick={onClick}>
                {children}
            </button>
        </div> 
    );
}

export default CTA;

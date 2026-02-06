import React from "react";

function Head({ children }: { children: React.ReactNode }): React.JSX.Element {
    return ( 
        <div className='head'>
            {children}
        </div>
    );
}

export default Head;

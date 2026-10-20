import React from "react";

function Main({ children, ref }: { children: React.ReactNode; ref?: React.Ref<HTMLElement> }): React.JSX.Element {
    return (
        <main ref={ref} className='flex flex-col bg-linear-to-r from-black/15 via-black/30 to-black/15 backdrop-blur-xs sm:from-black sm:to-black'>
            {children}
        </main>
    );
}

export default Main;

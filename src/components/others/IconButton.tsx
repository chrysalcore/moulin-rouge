import React from "react";

function IconButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }): React.JSX.Element {
    return (
        <button className='grid size-11 cursor-pointer place-items-center rounded-full transition duration-200 ease-smooth hover:bg-white/10 active:scale-90' aria-label={label} onClick={onClick}>
            <img className='size-6' src={icon} alt='' />
        </button>
    );
}

export default IconButton;

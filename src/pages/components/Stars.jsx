function Stars({ rating }) {
    return (
        <div id="stars">
        {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            const isFull = rating >= starValue;
            const isHalf = rating >= starValue - 0.5 && rating < starValue;

            return (
                <svg key={index} class="star" viewBox="0 0 24 24" stroke="#ffc107" strokeWidth="1">
                    {isHalf && (
                    <defs>
                        <linearGradient id="halfGradient">
                        <stop offset="50%" stopColor="#ffc107" />
                        <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    )}
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={isHalf ? "url(#halfGradient)" : isFull? "#ffc107" : "none"}/>
                </svg>
            );
        })}
        </div>
    );
}

export default Stars
import '../assets/styles/Categories.css'

function Categories() {
    const ctgs = [
        {
            name: 'Meats',
            href: ''
        },
        {
            name: 'Rices',
            href: ''
        },
        {
            name: 'Salads',
            href: ''
        },
        {
            name: 'Companions',
            href: ''
        },
        {
            name: 'Italian Food',
            href: ''
        },
        {
            name: 'Drinks',
            href: ''
        },
        {
            name: 'Desserts',
            href: ''
        }
    ]

    return (
        <section className="categories section">
            <header className="section-header">
                <h2 className="section__title">Your next favorite meal is here</h2>
                <p className="section__desc">Discover an experience that awakens the senses.Indulge in authentic flavors, warm atmospheres, and moments that will become memories.</p>
            </header>
            <ul className="categories-list">
                {ctgs.map(item => {
                    return (
                        <li className="category" key={item.name}>
                            <a className="category__link" href={item.href}>
                                <strong className='category__name'>{item.name}</strong>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Categories
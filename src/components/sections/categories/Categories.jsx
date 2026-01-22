import '../../../assets/styles/Categories.css'
import Category from './Category'

function Categories({ data }) {
    return (
        <section className="categories section" id='categories'>
            <ul className="categories-list">
                {data.map(item => (
                    <Category name={item} key={item} />
                ))}
            </ul>
        </section>
    )
}

export default Categories
import SectionHeader from './SectionHeader';
import headers from '../../data/headers'

function Section({ children, type }) {
    return (
        <section className={`${type} section`} >
            <SectionHeader {...headers[type]} />
            {children}
        </section>
    )
}

export default Section;
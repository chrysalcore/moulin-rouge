import '../../../assets/styles/Events.css'
import useCurrent from '../../../hooks/useCurrent'
import Event from './Event'
import BriefHeader from '../../global/BriefHeader'

import info from '../../../data/briefs';

function EventList({ data }) {
    const [current, handleNext, handlePrev] = useCurrent()

    return (
        <article className='events section'>
            <BriefHeader {...{ info : info[0], handleNext, handlePrev }} />
            <section className='events-list'> 
                { (current === 0)? <Event {...data[data.length - 1]}/> : <Event {...data[current - 1]}/>}
                <Event {...data[current]} main />
                { (data.length - 1 === current)? <Event {...data[0]}/> : <Event {...data[current + 1]}/>}
            </section>
        </article>
    )
}

export default EventList
import '../../../assets/styles/Dishes.css'
import useCurrent from '../../../hooks/useCurrent';
import Dish from './Dish'
import BriefHeader from '../../global/BriefHeader'

import info from '../../../data/briefs';

function DishesBrief({ data }) {
    const [current, handleNext, handlePrev] = useCurrent()

    return (
        <article className='dishes section'>
            <BriefHeader {...{ info : info[1], handleNext, handlePrev }} />
            <section className='dishes-brief'>
                { (current === 0)? <Dish {...data[data.length - 1]}/> : <Dish {...data[current - 1]}/>}
                <Dish {...data[current]} main />
                { (data.length - 1 === current)? <Dish {...data[0]}/> : <Dish {...data[current + 1]}/>}
            </section>
        </article>
    )
}

export default DishesBrief
import { useRef, useEffect } from 'react'
import '../../assets/styles/Reservations.css'

import SectionHeader from '../global/SectionHeader'
import Form from '../others/Form'
import header from '../../data/headers'
import { inputs as data } from '../../data/contact'

function Reservations() {
    const ref = useRef()
    
    useEffect(() => {
        ref.current.scrollIntoView()
    }, [])

    return (
        <main ref={ref} className='reservations section'>
            <div className='reservations__img'></div>
            <section className='reservations-content'>
                <SectionHeader {...header.reservation} />
                <Form data={data} />
            </section>
        </main>
    )
}

export default Reservations
import '../assets/styles/Reservations.css'
import Form from '../components/Form'

function Reservations() {
    const data = [
        {
            name: 'name',
            type: 'text',
            placeholder: 'John Doe',
            isInput: true
        },
        {
            name: 'date',
            type: 'datetime-local',
            placeholder: '',
            isInput: true
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'johndoe@gmail.com',
            isInput: true
        },
        {
            name: 'capacity',
            type: 'number',
            placeholder: '6',
            isInput: true
        }
    ]

    return (
        <section className='reservations section'>
            <div className='reservations__img'></div>
            <div className='reservations-content'>
                <header className='section-header'>
                    <h2 className='section__title'>Reservation</h2>
                    <p className='section__desc'>Fill the the following fields</p>
                </header>
                <Form data={data} />
            </div>
        </section>
    )
}

export default Reservations
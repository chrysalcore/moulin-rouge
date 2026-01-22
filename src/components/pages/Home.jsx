import { useData } from "../../context/dataContext";
import Categories from "../sections/categories/Categories";
import Section from "../global/Section";
import EventList from '../sections/events/EventList'
import DishesBrief from '../sections/dishes/DishesBrief';
import AboutList from "../sections/about/AboutList";
import ContactList from '../sections/contact/ContactList';
import CTA from "../others/CTA";

function Home() {
    const { categories, dishes, events } = useData()

    return (
        <>  
            <Categories data={categories} />
            <main className='main'>
                <EventList data={events.slice(0, 5)} /> 
                <Section type={'about'}>
                    <AboutList />
                    <CTA>Show More</CTA>
                </Section>
                <DishesBrief data={dishes.slice(0, 5)} />
                <Section type={'about'}>
                    <ContactList />
                </Section>
            </main>
        </>
    )
}

export default Home
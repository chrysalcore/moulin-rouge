import React from "react";
import useDishes from "../../hooks/useDishes";
import useEvents from "../../hooks/useEvents";
import AsyncContent from "../others/AsyncContent";
import Categories from "../sections/categories/Categories";
import Section from "../global/Section";
import EventList from '../sections/events/EventList';
import DishesBrief from '../sections/dishes/DishesBrief';
import AboutList from "../sections/about/AboutList";
import ContactList from '../sections/contact/ContactList';
import CTA from "../others/CTA";

function Home(): React.JSX.Element {
    const dishes = useDishes();
    const events = useEvents();

    return (
        <>
            <Categories data={dishes.categories} />
            <main className='main'>
                <AsyncContent status={events}>
                    <EventList data={events.data.slice(0, 5)} />
                </AsyncContent>
                <Section type={'about'}>
                    <AboutList />
                    <CTA>Show More</CTA>
                </Section>
                <AsyncContent status={dishes}>
                    <DishesBrief data={dishes.data.slice(0, 5)} />
                </AsyncContent>
                <Section type={'contact'}>
                    <ContactList />
                </Section>
            </main>
        </>
    );
}

export default Home;

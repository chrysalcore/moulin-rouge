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
import Button from "../others/Button";
import Main from "../global/Main";
import headers from "../../data/headers";

function Home(): React.JSX.Element {
    const dishes = useDishes();
    const events = useEvents();

    return (
        <>
            <Categories data={dishes.categories} />
            <Main>
                <AsyncContent status={events}>
                    <EventList data={events.data.slice(0, 5)} />
                </AsyncContent>
                <Section header={headers.about}>
                    <AboutList />
                    <Button>Show More</Button>
                </Section>
                <AsyncContent status={dishes}>
                    <DishesBrief data={dishes.data.slice(0, 5)} />
                </AsyncContent>
                <Section header={headers.contact}>
                    <ContactList />
                </Section>
            </Main>
        </>
    );
}

export default Home;

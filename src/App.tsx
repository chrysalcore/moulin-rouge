import React from "react";
import './App.css';
import Head from "./components/sections/head/Head";
import Header from './components/sections/head/Header';
import Hero from "./components/sections/head/Hero";
import Footer from "./components/sections/footer/Footer";
import FooterContent from "./components/sections/footer/FooterContent";
import FooterRights from "./components/sections/footer/FooterRights";
import SocialInfo from './components/others/SocialInfo';
import { Outlet } from 'react-router-dom';

function App(): React.JSX.Element {
    return (
        <>
            <Head>
                <Header />
                <Hero />
            </Head>
            <Outlet />
            <Footer>
                <FooterContent />
                <SocialInfo variant='footer' />
                <FooterRights />
            </Footer>
        </>
    );
}

export default App;

import React from "react";
import './App.css';
import Head from "./components/sections/head/Head";
import Header from './components/sections/head/Header';
import Hero from "./components/sections/head/Hero";
import Footer from "./components/sections/footer/Footer";
import FooterContent from "./components/sections/footer/FooterContent";
import FooterRights from "./components/sections/footer/FooterRights";
import SocialInfo from './components/others/SocialInfo';
import Main from './components/Main';

function App(): React.JSX.Element {
    return (
        <>
            <Head>
                <Header />
                <Hero />
            </Head>
            <Main />
            <Footer>
                <FooterContent />
                <SocialInfo />
                <FooterRights />
            </Footer>
        </>
    );
}

export default App;

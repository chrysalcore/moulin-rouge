import React from "react";
import { Outlet } from 'react-router-dom';
import { DataProvider } from './context/dataContext';
import useConnect from './hooks/useConnect';
import './App.css';
import Head from "./components/sections/head/Head";
import Header from './components/sections/head/Header';
import Hero from "./components/sections/head/Hero";
import Footer from "./components/sections/footer/Footer";
import FooterContent from "./components/sections/footer/FooterContent";
import FooterRights from "./components/sections/footer/FooterRights";
import SocialInfo from './components/others/SocialInfo';
import Loading from './components/others/Loading';

function App(): React.JSX.Element {
  const [
    loading,
    dishes,
    events,
    categories,
    error
  ] = useConnect();
  
  return (
    <>
      <Head>
        <Header />
        <Hero />
      </Head>
      {(loading)?
        <Loading />
        :
        (error)?
          <h2>No se han podido cargar los datos</h2>
          :
          <DataProvider value={{ categories, dishes, events }}>
            <Outlet />
          </DataProvider>
      }
      <Footer>
        <FooterContent />
        <SocialInfo />
        <FooterRights />
      </Footer>
    </>
  );
}

export default App;

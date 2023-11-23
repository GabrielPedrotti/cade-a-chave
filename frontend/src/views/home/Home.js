import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

const Home = () =>{
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex-grow flex">
        <Main/>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
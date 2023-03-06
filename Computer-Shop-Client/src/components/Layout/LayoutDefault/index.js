import ContactIcon from '@/components/ContactIcon';
import GlobalLoading from '@/components/Loading/Global';
import ScrollTo from '@/components/ScrollTo';
import React, { Suspense } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const DefaultLayout = ({ children }) => {
    return (
        <div className="App bg-white" id="app">
            <Header />
            <ScrollTo />
            <ContactIcon />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;

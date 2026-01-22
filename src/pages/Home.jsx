import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import Approach from '../components/Approach';
import Contact from '../components/Contact';

const Home = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <Hero />
            <Expertise />
            <Approach />
            <Contact />
        </main>
    );
};

export default Home;

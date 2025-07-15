import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/shared/NavBar/NavBar';
import Footer from '../pages/shared/Footer/Footer';

const rootLayout = () => {
    return (
            <div className='max-w-[1400px] mx-auto scroll-smooth'>
            <header className='sticky top-1.5 bg-transparent z-50 backdrop-blur-lg'>
                <NavBar></NavBar>
            </header>
            {/* Main sections */}
            <main className='md:px-2.5'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>

            
            
        </div>
       
    );
};

export default rootLayout;
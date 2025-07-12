import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/shared/NavBar/NavBar';
import Footer from '../pages/shared/Footer/Footer';

const rootLayout = () => {
    return (
        <div className="">
            <div className='max-w-7xl mx-auto'>
            <header>
                <NavBar></NavBar>
            </header>
            {/* Main sections */}
            <main>
                <Outlet></Outlet>
            </main>

            
            
        </div>
        <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default rootLayout;
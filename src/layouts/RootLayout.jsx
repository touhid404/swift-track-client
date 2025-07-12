import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/shared/NavBar/NavBar';
import Footer from '../pages/shared/Footer/Footer';

const rootLayout = () => {
    return (
            <div className='max-w-[1400px] mx-auto'>
            <header>
                <NavBar></NavBar>
            </header>
            {/* Main sections */}
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>

            
            
        </div>
       
    );
};

export default rootLayout;
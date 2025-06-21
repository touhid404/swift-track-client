import React from 'react';
import logo from '../../../assets/logo.png';

const SwiftTrackLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <p className='text-2xl -ml-2 font-extrabold'>Swift Track</p>
            
        </div>
    );
};

export default SwiftTrackLogo;
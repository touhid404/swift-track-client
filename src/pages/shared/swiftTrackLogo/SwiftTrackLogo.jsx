import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router';

const SwiftTrackLogo = () => {
    return (
        <Link to='/'>
          <div className="flex items-end">
            {/* Logo image is always visible */}
            <img className="mb-2 w-8 h-8" src={logo} alt="SwiftTrack Logo" />
            
            {/* Text shown only on md and larger */}
            <p className="text-2xl -ml-2 font-extrabold hidden md:block">
                Swift Track
            </p>
        </div>
        </Link>
    );
};

export default SwiftTrackLogo;

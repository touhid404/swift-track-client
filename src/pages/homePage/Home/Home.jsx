import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Brands from '../OurClients/Brands';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Brands></Brands>
            <BeMerchant></BeMerchant>
        </div>
    );
};

export default Home;
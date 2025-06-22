import React from 'react';
import location from '../../../assets/location-merchant.png';

const BeMerchant = () => {
  return (
    <div data-aos="flip-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-[#03373D] bg-no-repeat py-12 px-4 lg:px-12 rounded-2xl my-10">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse gap-8 lg:gap-16">
        <img
          src={location}
          alt="Merchant Location"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md"
        />
        <div className="text-white text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-4 text-sm sm:text-base lg:py-6 max-w-2xl mx-auto lg:mx-0">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="btn btn-primary bg-[#CAEB66] rounded-full text-black border-none">Become a Merchant</button>
            <button className="btn btn-primary bg-transparent  border border-[#CAEB66] rounded-full text-[#CAEB66] ">Earn with Profast Courier</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;

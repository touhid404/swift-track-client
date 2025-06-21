import React from 'react';
import Marquee from 'react-fast-marquee';

import logo1 from '../../../assets/brands/amazon.png';
import logo2 from '../../../assets/brands/amazon_vector.png';
import logo3 from '../../../assets/brands/casio.png';
import logo4 from '../../../assets/brands/moonstar.png';
import logo5 from '../../../assets/brands/randstad.png';
import logo6 from '../../../assets/brands/start.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

const Brands = () => {
  return (
    <section className=" py-8">
      <div className="text-center mb-6">
        <p className="text-lg font-bold py-3">
          We've helped thousands of sales teams
        </p>
      </div>
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-8 flex items-center justify-center">
            <img src={logo} alt={`brand-${idx}`} className="h-10 object-contain" />
          </div>
        ))}
      </Marquee>
      <div className="border-t border-dashed mt-6 mx-12"></div>
    </section>
  );
};

export default Brands;

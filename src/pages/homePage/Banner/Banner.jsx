import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/banner/banner1.png';
import img2 from '../../../assets/banner/banner2.png';
import img3 from '../../../assets/banner/banner3.png';

const Banner = () => {
    return (
        <div className="w-full mx-auto px-2.5 rounded-xl overflow-hidden">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                transitionTime={800}
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                stopOnHover={true}
                emulateTouch={true}
                swipeable={true}
                useKeyboardArrows={true}
                ariaLabel="Delivery app banner carousel"
                dynamicHeight={false}
            >
                <div>
                    <img src={img1} alt="Fast Delivery Service" />
                    
                </div>
                <div>
                    <img src={img2} alt="Real-time Tracking" />
                  
                </div>
                <div>
                    <img src={img3} alt="Fleet Management" />
                   
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";

export function Slider() {
  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src="./assets/images/covers/cover_1.jpg"/>
        </SwiperSlide>
        <SwiperSlide><img src="./assets/images/covers/cover_2.jpg"/></SwiperSlide>
        <SwiperSlide><img src="./assets/images/covers/cover_3.jpg"/></SwiperSlide>
        <SwiperSlide><img src="./assets/images/covers/cover_4.jpg"/></SwiperSlide>
     
      </Swiper>
    </>
  );
}
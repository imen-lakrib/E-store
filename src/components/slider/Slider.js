import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Pagination } from "swiper";
import { Typography } from "@mui/material";

export default function Slider({direction}) {
  return (
    <>
      <Swiper
        // dir={direction}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
       



        <SwiperSlide >
          <img src="/assets/images/covers/cover_18.jpg"/>
          <div>
            <Typography variant="h1">hello world</Typography>
            <Typography variant="h6"> hello world hello world hello world hello world hello world hello world hello world hello world</Typography>

          </div>
          </SwiperSlide>

          <SwiperSlide >
          <img src="/assets/images/covers/cover_19.jpg"/>
          <div>
            <Typography variant="h1">hello world</Typography>
            <Typography variant="h6"> hello world hello world hello world hello world hello world hello world hello world hello world</Typography>

          </div>
          </SwiperSlide>




        
      </Swiper>
    </>
  );
}

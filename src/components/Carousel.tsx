import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Anime } from "../types";
import { FC } from "react";
import { Link } from "react-router-dom";

interface CarouselProps {
  data: Anime[];
}

const Carousel: FC<CarouselProps> = ({ data }) => {
  return (
    <Swiper
      modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
      style={{ minHeight: 150 }}
      className="rounded-md overflow-hidden"
      effect="coverflow"
      slidesPerView={1}
      speed={1000}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        depth: 200,
        modifier: 1,
        rotate: 60,
        slideShadows: true,
        stretch: 0,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      loop
    >
      {data.map((e, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative"
            style={{ height: "calc(0.22 * 90vw)", minHeight: 150 }}
          >
            <Link to={`/anime/${e.id}`}>
              <div
                className="background-image z-10 w-full h-full"
                style={{
                  backgroundImage: `url(${e.banner_image})`,
                  filter: "brightness(0.7)",
                }}
              ></div>
              <h1 className="bottom-7 left-9 right-9 z-20 absolute text-2xl text-white overflow-ellipsis whitespace-nowrap overflow-hidden">
                {e.titles?.en ||
                  e.titles?.jp ||
                  e.titles?.it ||
                  "Unknown title"}
              </h1>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

import React from "react";
import { Carousel } from 'antd';
import ImageSlide from '../assets/image/slideshow-1_1920x 1.jpg'
const Home: React.FC = () => {

  const banner = [
    { name: "HAGAN CORE TF LIGHT TOURING", slogan: "SKI BOOT LINERS" },
    { name: "HAGAN CORE TF LIGHT TOURING", slogan: "SKI BOOT LINERS" }
  ]
  document.title = "Trang chủ"

  return (
    <Carousel >
      {
        banner.map((item) => (
          <div className="banner-item">
            <img src={ImageSlide} />
            <div className="slogan">
              <p>{item.name}</p>
              <span>{item.slogan}</span>
            </div>
          </div>
        ))
      }
    </Carousel>
  );
};

export default Home;

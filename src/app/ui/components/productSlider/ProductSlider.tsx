import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { FaUsers } from "react-icons/fa6";
import { FiSmartphone, FiFigma } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { RiCodeSSlashLine } from "react-icons/ri";
import "./ProuctSlider.css";

const partners = [
  {
    id: 1,
    icon: <FiSmartphone size={60} color="#97A3B6" />,
    name: "Android / IOS App Development",
  },
  {
    id: 2,
    icon: <FaUsers size={60} color="#97A3B6" />,
    name: "Outsourcing / Consulting",
  },
  {
    id: 3,
    icon: <BiSupport size={60} color="#97A3B6" />,
    name: "Equpiment Set-up",
  },
  {
    id: 4,
    icon: <RiCodeSSlashLine size={60} color="#97A3B6" />,
    name: "Web App Development",
  },
  {
    id: 5,
    icon: <FiFigma size={60} color="#97A3B6" />,
    name: "UI/UX Design",
  },
  {
    id: 6,
    icon: <RiCodeSSlashLine size={60} color="#97A3B6" />,
    name: "Web App Development",
  },
];

export default function PartnersSlider() {
  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="swiper-container"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id} className="swiper-slide">
              <div className="partner-item">
                {partner.icon}
                <span className="partner-name">{partner.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

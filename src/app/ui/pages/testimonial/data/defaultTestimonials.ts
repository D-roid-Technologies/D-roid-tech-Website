import { Assets } from "../../../../utils/constant/Assets";
import { TestimonialData } from "../types/testimonial";

export const defaultTestimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechSolutions Inc.",
    content:
      "D'roidTech transformed our digital infrastructure completely. Their team delivered beyond our expectations with innovative solutions that boosted our productivity by 40%.",
    avatar: Assets.images.sj,
    companyLogo:
      "https://res.cloudinary.com/dikhomv7m/image/upload/v1756215497/logo-tech-solutions-r1_xspwcz.png",
  },
  {
    id: 2,
    name: "Michael Obiagwu",
    role: "Senior Backend Engineer, Ecobank Nigeria",
    content:
      "The custom software developed by D'roid has been game-changing for our operations. Their attention to detail and micro-launch support is exceptional.",
    avatar: Assets.images.mo,
    companyLogo:
      "https://res.cloudinary.com/dikhomv7m/image/upload/Ecobank_Logo.svg_wx5fz4.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager, DigitalFirst",
    content:
      "Working with D'roidTech was a seamless experience. They understood our vision and delivered a product that perfectly matched our requirements ahead of schedule.",
    avatar: Assets.images.er,
    companyLogo:
      "https://res.cloudinary.com/dikhomv7m/image/upload/images_hxkfjo.png",
  },
];

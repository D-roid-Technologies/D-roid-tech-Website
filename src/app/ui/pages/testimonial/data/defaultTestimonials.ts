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
      "https://www.techsolutionsinc.com/wp-content/uploads/2020/05/logo-tech-solutions-r1.png",
  },
  {
    id: 2,
    name: "Michael Obiagwu",
    role: "Senior Backend Engineer, Ecobank Nigeria",
    content:
      "The custom software developed by D'roid has been game-changing for our operations. Their attention to detail and micro-launch support is exceptional.",
    avatar: Assets.images.mo,
    companyLogo:
      "https://facilitatorsc.com/wp-content/uploads/2019/11/Ecobank_logo_logotype_blue-scaled.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager, DigitalFirst",
    content:
      "Working with D'roidTech was a seamless experience. They understood our vision and delivered a product that perfectly matched our requirements ahead of schedule.",
    avatar: Assets.images.er,
    companyLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTThaWRKDFGCLhN3GHtKgcFmHEyYCap8_5fow&s",
  },
];

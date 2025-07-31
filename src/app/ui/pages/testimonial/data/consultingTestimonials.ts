// data/clientTestimonials.ts
import { Assets } from "../../../../utils/constant/Assets";
import { TestimonialData } from "../types/testimonial";

export const consultingTestimonials: TestimonialData[] = [
  {
    id: 1,
    name: "John Doe",
    role: "CTO, ClientCorp",
    content:
      "Before, our backend was struggling to keep up but thanks to their expertise in Node.js and cloud optimization, we restructured our entire system. Now we can handle 5× more users without a hitch. This upgrade didn’t just improve speed it made scaling effortless. They truly set us up for long-term success!",
    avatar: Assets.images.er,
    // companyLogo: "https://example.com/logo.png",
  },
  {
    id: 2,
    name: "John Doe",
    role: "CEO, LEADPAC",
    content:
      "They helped us migrate from our old PHP system to a modern React + TypeScript stack, giving us a fresh, intuitive user experience and a massive performance boost. Students and teachers immediately noticed the difference faster loading times, smoother navigation, and a cleaner interface. This upgrade has completely transformed the way our users engage with the platform!",
    avatar: Assets.images.sj,
    // companyLogo: "https://example.com/logo.png",
  },
];

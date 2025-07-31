// data/testimonialDataMap.ts
import { TestimonialData } from "../types/testimonial";
import { defaultTestimonials } from "./defaultTestimonials";
import { consultingTestimonials } from "./consultingTestimonials";
// import { partnerTestimonials } from "./partnerTestimonials";

export const testimonialDataMap: Record<string, TestimonialData[]> = {
  default: defaultTestimonials,
  consulting: consultingTestimonials,
  // partner: partnerTestimonials,
};

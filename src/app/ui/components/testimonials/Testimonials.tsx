import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../testimonials/Testimonials.css";
// import { Testimonailstype } from "../../../utils/Types";
// import testbackgroundImage from "../../../images/png/customerfeedback2.jpg";

interface Testimonial {
  quote: string;
  author: string;
}

interface CustomerFeedbackProps {
  testbackgroundImage: string;
  testimonials: Testimonial[];
}

const Testimonials: React.FunctionComponent<CustomerFeedbackProps> = ({
  testbackgroundImage,
  testimonials,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="feedback-section">
      <div
        style={{
          backgroundImage: `url("${testbackgroundImage}")`,
        }}
        className="testBg-image"
      >
        <div className="test-testimonials">
          <div>
            <h2 className="test-read">READ WHAT OUR CUSTOMERS HAVE TO SAY!</h2>
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="test-testimonial-details">
                  <p className="test-quote">{testimonial.quote}</p>
                  <p className="author"> {testimonial.author}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

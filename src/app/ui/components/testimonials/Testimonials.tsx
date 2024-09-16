import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../testimonials/Testimonials.css";
// import { Testimonailstype } from "../../../utils/Types";
// import testbackgroundImage from "../../../images/png/customerfeedback2.jpg";
import testbackgroundImage from "../../../images/png/custoomer-review-bg-image.png";
import { TESTIMONIALS } from "../../../utils/constant/Testimonial";

const Testimonials: React.FunctionComponent<any> = () => {
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          // background: "#12d6d6",
          right: "-15px",
          zIndex: 10,
        }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          left: "-1px",
          zIndex: 10,
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
              {TESTIMONIALS.map((i, j) => (
                <div key={j} className="test-testimonial-details">
                  <p className="test-quote">{`${j + 1}.  "${i.body}"`}</p>
                  <p className="author">
                    {`- ${i.author}, ${i.position}, ${i.company} `}
                  </p>
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

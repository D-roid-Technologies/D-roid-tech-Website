import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import "../aboutus/AboutUs.css";

const AboutUs: React.FunctionComponent = () => {
  return (
    <>
      <NavBar />
      <div className="about-main">
        <div className="section-one">
          <div className="coding-image">
            <img
              src={Assets.images.coding}
              alt="codingImage"
              className="image-size"
            />
          </div>
          <div className="history">
            <p className="our-history"> Our History</p>
            <p className="histoy-details">
              {" "}
              D'roid Technologies International was founded in 2005 by a group
              of software developers with passion for creating innovative
              solutions. Over the years, we have grouwn into a leading software
              development company, serving clients in a wide range of
              industries.
            </p>{" "}
          </div>
        </div>
        {/* VISON AND MISSION SECTION */}
        <section>
          <article>
            <h2 className="vision"> Vision & Mission </h2>
            <p className="vision-details">
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel quis
              fugiat ut, non ipsum veritatis nam minima magni doloremque,
              ratione maxime dignissimos nulla, autem nesciunt dolor tenetur
              obcaecati minus ex. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Perspiciatis delectus, repudiandae, quos
              eligendi neque qui voluptas quam error eaque soluta minima
              corporis! Cum laboriosam deserunt quia reiciendis earum
              voluptatibus inventore.
            </p>
          </article>
        </section>
        <div className="vision-misson-value">
          <div className="vision-main">
            <h2 className="vision-header">Vision</h2>
            <div className="vision-box">
              {" "}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                molestias pariatur et modi reprehenderit! Quidem fugiat,
                voluptatum odio est debitis, at inventore, aut laboriosam
                obcaecati iusto alias sunt dolores eos.
              </p>
            </div>
          </div>
          {/* BOX TWO */}
          <div className="vision-main">
            <h2 className="vision-header">Mission</h2>
            <div className="vision-box">
              {" "}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                molestias pariatur et modi reprehenderit! Quidem fugiat,
                voluptatum odio est debitis, at inventore, aut laboriosam
                obcaecati iusto alias sunt dolores eos.
              </p>
            </div>
          </div>
          {/* BOX THREE */}
          <div className="vision-main">
            <h2 className="vision-header">Core Values</h2>
            <div className="vision-box">
              {" "}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                molestias pariatur et modi reprehenderit! Quidem fugiat,
                voluptatum odio est debitis, at inventore, aut laboriosam
                obcaecati iusto alias sunt dolores eos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

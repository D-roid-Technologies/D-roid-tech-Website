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
        <section>
          <div>
            <div className="vision-mission-value">
              <div className="vision-main">
                <h2 className="vision-header">Vision</h2>
                <div className="vision-box">
                  {" "}
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    molestias pariatur et modi reprehenderit! Quidem fugiat,
                    voluptatum odio est debitis, at inventore, aut laboriosam.
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
                    voluptatum odio est debitis, at inventore, aut laboriosam.
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
                    voluptatum odio est debitis, at inventore, aut laboriosam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* OUR TEAM SECTION */}
        <section>
          <article>
            <h2 className="our-team"> Our Team </h2>
            <p className="our-team-details">
              {" "}
              We are a team with young & enthusiastic developers and designers
              who is passionate about their feild of study.
            </p>
          </article>
        </section>
        {/* OUR TEAM PROFILE IMAGES */}
        <div className="profile-image">
          {/* PROFILE ONE */}
          <div className="profile-one">
            <img
              src={Assets.images.imageone}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Ekene </h3>
            <p>Software Engineer</p>
          </div>
          {/* PROFILE TWO */}
          <div className="profile-one">
            <img
              src={Assets.images.imagetwo}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Stella </h3>
            <p>Frontend Developer </p>
          </div>
          {/* PROFILE THREE */}
          <div className="profile-one">
            <img
              src={Assets.images.imagethree}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Uzochukwu </h3>
            <p>Frontend Development</p>
          </div>
          {/* PROFILE FOUR */}
          <div className="profile-one">
            <img
              src={Assets.images.imageone}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Name Unknown </h3>
            <p> UI UX Engineer </p>
          </div>
          {/* PROFILE FIVE */}
          <div className="profile-one">
            <img
              src={Assets.images.imagethree}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Name Unknown </h3>
            <p>Software Engineer</p>
          </div>
        </div>
        {/* PROFILE SECTION TWO */}
        <div className="profile-imagetwo">
          {/* PROFILE ONE */}
          <div className="profile-one">
            <img
              src={Assets.images.imageone}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Name Unknown </h3>
            <p>Software Engineer</p>
          </div>
          {/* PROFILE TWO */}
          <div className="profile-one">
            <img
              src={Assets.images.imagetwo}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Name Unknown </h3>
            <p>Frontend Developer </p>
          </div>
          {/* PROFILE THREE */}
          <div className="profile-one">
            <img
              src={Assets.images.imagethree}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Name Unknown </h3>
            <p>Frontend Development</p>
          </div>
          <div className="profile-one">
            <img
              src={Assets.images.imagetwo}
              alt="profileImage"
              className="image-sizes"
            />
            <h3> Name Unknown </h3>
            <p>Frontend Developer </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

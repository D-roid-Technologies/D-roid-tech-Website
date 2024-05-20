import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import "../aboutus/AboutUs.css";

const AboutUs: React.FunctionComponent = () => {
  // Give at lest 50px marginbottom gap for all parent divs
  return (
    <>
      <div className="aboutus-bg-color">
        <NavBar />
        <div className="about-main">
          <div className="aboutus-marginbutton">
            <div className="section-one">
              <div className="coding-image">
                <img
                  src={Assets.images.companyLogo}
                  alt="codingImage"
                  className="image-sized"
                />
              </div>
              <div className="about-history">
                <p className="about-history-heading"> Our History</p>
                <p className="about-histoy-details">
                  D'roid Technologies International was founded in 2005 by a
                  group of software developers with passion for creating
                  innovative solutions. Over the years, we have grouwn into a
                  leading software development company, serving clients in a
                  wide range of industries.
                </p>
              </div>
            </div>
          </div>
          {/* VISON AND MISSION SECTION */}

          {/* <section className="vision-section"> */}
          {/* <article>
                <h2 className="vision"> Vision & Mission </h2> */}
          {/* <p className="vision-details">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                  quis fugiat ut, non ipsum veritatis nam minima magni
                  doloremque, ratione maxime dignissimos nulla, autem nesciunt
                  dolor tenetur obcaecati minus ex. Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Perspiciatis delectus,
                  repudiandae, quos eligendi neque qui voluptas quam error eaque
                  soluta minima corporis! Cum laboriosam deserunt quia
                  reiciendis earum voluptatibus inventore.
                </p> */}
          {/* </article> */}
          {/* </section> */}
          <div className="vision-marginbuttom">
            <section>
              <div className="vision-mission-value">
                {/* BOX ONE */}
                <div className="vision-main">
                  <div className="vision-box">
                    <h2 className="vision-header">Vision</h2>
                    <p>
                      Our vision is to be a global leader in technological
                      innovation, known for our exceptional service and
                      transformative solutions. We aspire to create a future
                      where technology seamlessly integrates with everyday life,
                      fostering growth, creativity, and progress. By continually
                      advancing our expertise and embracing new challenges, we
                      aim to shape a world where technology is accessible and
                      beneficial to all.
                    </p>
                  </div>
                </div>
                {/* BOX TWO */}
                <div className="vision-main">
                  <div className="vision-box">
                    <h2 className="vision-header">Mission</h2>
                    <p>
                      Our mission is to empower individuals and businesses
                      through innovative technology solutions. We strive to
                      deliver high-quality, scalable, and user-friendly software
                      applications, cutting-edge animation, comprehensive tech
                      training, and advanced drone services. Our commitment is
                      to enhance our clients' capabilities, enabling them to
                      achieve their goals with efficiency and excellence.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* CORE VALUES BOX THREE */}
          <div className="core-value-vision-main">
            <div className="vision-box">
              <h2 className="core-value-vision-header">Core Values</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                molestias pariatur et modi reprehenderit! Quidem fugiat,
                voluptatum odio est debitis, at inventore, aut laboriosam. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Ad molestias
                pariatur et modi reprehenderit! Quidem fugiat, voluptatum odio
                est debitis, at inventore, aut laboriosam. Quidem fugiat,
                voluptatum odio est debitis, at inventore, aut laboriosam. aut
                laboriosam.
              </p>
            </div>
          </div>

          {/* OUR TEAM SECTION */}
          <div className="ourteam-marginbottom">
            <section>
              <article>
                <h2 className="our-team"> Our Team </h2>
                <p className="our-team-details">
                  {" "}
                  We are a team with young & enthusiastic developers and
                  designers who is passionate about their feild of study.
                </p>
              </article>
            </section>
            {/* OUR TEAM PROFILE IMAGES */}
            <div className="profile-image">
              {/* PROFILE ONE */}
              <div className="profile-one">
                <img
                  src={Assets.images.malestaffone}
                  alt="profileImage"
                  className="image-sizes"
                />
                <h3> Ekene </h3>
                <p>Software Engineer</p>
              </div>
              {/* PROFILE TWO */}
              <div className="profile-one">
                <img
                  src={Assets.images.stellaimg}
                  alt="profileImage"
                  className="image-sizes"
                />
                <h3> Stella </h3>
                <p>Frontend Developer </p>
              </div>
              {/* PROFILE THREE */}
              <div className="profile-one">
                <img
                  src={Assets.images.uzoimg}
                  alt="profileImage"
                  className="image-sizes"
                />
                <h3> Uzochukwu </h3>
                <p>Frontend Development</p>
              </div>
              {/* PROFILE FOUR */}
              <div className="profile-one">
                <img
                  src={Assets.images.faithimg}
                  alt="profileImage"
                  className="image-sizes"
                />
                <h3> Chukwueze Faith </h3>
                <p> Digital Marketer</p>
              </div>
            </div>
            {/* PROFILE SECTION TWO */}
            <div className="profile-imagetwo">
              {/* PROFILE ONE */}
              <div className="profile-one">
                <img
                  src={Assets.images.malestafffour}
                  alt="profileImage"
                  className="image-sizes"
                />
                <h3> Name Unknown </h3>
                <p>Software Engineer</p>
              </div>

              {/* PROFILE THREE */}
              <div className="profile-one">
                <img
                  src={Assets.images.malestafftwo}
                  alt="profileImage"
                  className="image-sizes"
                />
                <h3> Name Unknown </h3>
                <p>Frontend Development</p>
              </div>
              <div className="profile-one">
                <img
                  src={Assets.images.malestaffone}
                  alt="profileImage"
                  className="image-sizes"
                />
                <h3> Name Unknown </h3>
                <p>Frontend Developer </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

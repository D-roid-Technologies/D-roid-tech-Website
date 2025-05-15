import React from "react";
import "./Partners.css";
import "../liteGrid@v1.0/lite-grid.css";
import { Assets } from "../../../utils/constant/Assets";
import { RoutePaths } from "../../../routes/Index";

const logos = [
  {
    src: "https://images.seeklogo.com/logo-png/27/2/intel-logo-png_seeklogo-270869.png",
    alt: "Intel",
  },
  {
    src: "https://scontent.fabb1-3.fna.fbcdn.net/v/t39.30808-6/308408317_466190838885107_7274109674455319942_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFRgJFQUXo1IFQuhlPmIQxiY3F9WU9q0DVjcX1ZT2rQNWof_8Y68-K1s2yt1xOVirgAklPPdDdXFaN4m1QGKh3S&_nc_ohc=srOYWLUShJ4Q7kNvwFkczzM&_nc_oc=Adl6RKedSs0CLmF0bASaE4Z8DXgkHudoZ79QO1tK2rem9ILGRBUcexvwpsO78NuHlkI&_nc_zt=23&_nc_ht=scontent.fabb1-3.fna&_nc_gid=OXHHRU8LryTtjw8UfCPZeg&oh=00_AfJdP67I2YFQNQQguDkZ2PJEH-lIiMG0YkVRKiIt8OLQvA&oe=68293F02",
    alt: "Leadpac Foundation",
  },
  {
    src: Assets.images.logo5,
    alt: "Cisco Partner",
  },
  {
    src: "https://seeklogo.com/images/C/cisco-logo-FE0AB16DCF-seeklogo.com.png",
    alt: "Cisco Duplicate",
  },
  {
    src: "https://infobeans.com/wp-content/uploads/2023/08/msft-gold-partner.png",
    alt: "Microsoft",
  },

  {
    src: "https://static.vecteezy.com/system/resources/previews/000/585/690/non_2x/business-clock-logo-template-vector-icon.jpg",
    alt: "Clock Logo",
  },
  {
    src: "https://faan.gov.ng/wp-content/uploads/2023/03/Faan.logo_.png",
    alt: "Clock Logo",
  },
];

const Partners: React.FC = () => {
  return (
    <section className="partners-section">
      <div className="wrapper ">
        <div className="block-12" style={{ textAlign: "center" }}>
          <span className="title_span" style={{ marginTop: "20px" }}>
            Partners
          </span>
          <br />

          <h2 className="partners-h1">We Recognize the best</h2>
          <br />
        </div>
        <div className="group justify-content-center">
          <div className="block-12 block-md-1"></div>
          <div className="block-12 block-md-4 partners-left">
            <p className="partners-text">
              We have a worldwide presence with clients and partners, and our
              excellence in the IT industry is acknowledged by leading
              organizations.
            </p>
          </div>

          <div className="block-12 block-md-6">
            <div className="partners-logos">
              {logos.map((logo, index) => (
                <div key={index} className="partners-logo-wrapper">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="partners-logo"
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "20px", marginTop: "30px", justifyContent: "center" }}>
              <a
                href={RoutePaths.Partners}
                style={{ backgroundColor: "#000000", color: "#ffffff" }}
                className="navbar-cta"
              >
                See all Partners
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Partners;

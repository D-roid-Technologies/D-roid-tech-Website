import React from "react";
import "./Partners.css";
import "../liteGrid@v1.0/lite-grid.css";
import { Assets } from "../../../utils/constant/Assets";
import { RoutePaths } from "../../../routes/Index";

const logos = [
  {
    src: "https://res.cloudinary.com/dikhomv7m/image/upload/v1749809184/intel-logo-png_seeklogo-270869_feydqy.png",
    alt: "Intel",
  },
  {
    src: "https://res.cloudinary.com/dikhomv7m/image/upload/v1749808980/308408317_466190838885107_7274109674455319942_n_l8alqw.jpg",	
    alt: "Leadpac Foundation",
  },
  {
    src: Assets.images.logo5,
    alt: "Cisco Partner",
  },
  {
    src: "https://res.cloudinary.com/dikhomv7m/image/upload/v1749809184/cisco-logo-png_seeklogo-273963_liu70o.png",
    alt: "Cisco Logo",
  },
  {
    src: "https://res.cloudinary.com/dikhomv7m/image/upload/v1749809185/msft-gold-partner_dmqk3r.png",
    alt: "Microsoft",
  },

  {
    src:"https://res.cloudinary.com/dikhomv7m/image/upload/v1749809185/business-clock-logo-template-vector-icon_xbkosm.jpg",
    alt: "Clock Logo",
  },
  {
    src: "https://res.cloudinary.com/dikhomv7m/image/upload/v1749809185/Faan.logo__qpc4bh.png",
    alt: "Faan.logo",
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
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "30px",
                justifyContent: "center",
              }}
            >
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

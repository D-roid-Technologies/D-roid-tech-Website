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
    src: "https://scontent.fabb1-3.fna.fbcdn.net/v/t39.30808-6/482061783_606221468910755_5206625059538571548_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGcjHvelv2d4oRMBVBF4-suddCY58qEaJx10JjnyoRonIC_zk29MjdqNhtFwP3QkNm7Xl7RRGbwbKxsnsJedoeO&_nc_ohc=y5bfg8hAhXwQ7kNvwH59oBe&_nc_oc=AdmnEb_04hxYVJy90lnMOiTV1lwIRgYnSU0mJsF0CdCJ_cUFsGfq1YMn414i4BkNZWA&_nc_zt=23&_nc_ht=scontent.fabb1-3.fna&_nc_gid=BB0z1PhdNnILpELn8hQMVA&oh=00_AfK1xrIJN8MPvuy9dARkXpDNGlqNQOJspUFh6bbywHH-hg&oe=683F592F",
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

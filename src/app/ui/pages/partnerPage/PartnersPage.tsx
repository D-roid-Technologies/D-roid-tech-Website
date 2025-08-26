import React from "react";
import {
  updateModal,
  updateModalContent,
} from "../../../redux/slices/AppEntrySlice";
import { store } from "../../../redux/Store";
import { Assets } from "../../../utils/constant/Assets";
import NavBar from "../../components/navbar/NavBar";
import ContactSoftware from "../contact/ContactSection/ContactSoftware";
import ContactPartnersClients from "./ContactPartnersClients";
import styles from "../../components/global-styles/Banner.module.css";
import "../Dashboard/DashboardContent.module.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/button/BackButton";

const logos = [
  {
    src: "https://res.cloudinary.com/dikhomv7m/image/upload/v1749808980/308408317_466190838885107_7274109674455319942_n_l8alqw.jpg",
    alt: "Leadpac Foundation",
  },
  {
    src: Assets.images.obiebele,
    alt: "Obi Ebele",
  },
  {
    src: Assets.images.ntejeMedia,
    alt: "Nteje Media TV",
  },
];

const clientLogos = [
  {
    src: Assets.images.ecobank,
    alt: "Ecobank",
  },
  {
    src: Assets.images.accessbank,
    alt: "Access Bank",
  },
  {
    src: Assets.images.sanwoPay,
    alt: "Sanwo Pay",
  },
];

const PartnersClients: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div
        className={styles.bannerWrapper}
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideTwo})`,
        }}
      >
        <div style={{ margin: "1rem 0 0 3rem" }}>
          <BackButton label="Back" />
        </div>
        <div className={styles.bannerContent}>
          <h1>Partners & Clients</h1>
          <p>
            Our mission is amplified by those we walk with. Meet the innovators,
            educators, and storytellers who make what we do possible.
          </p>
        </div>
      </div>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="wrapper">
          <div className="block-12" style={{ textAlign: "center" }}>
            <span className="title_span" style={{ marginTop: "20px" }}>
              Partners
            </span>
            <br />
            <h2 className="partners-h1">Meet Our Partners</h2>
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

            <div className=" block-6">
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

              {/* <div
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                    marginTop: "30px",
                                    justifyContent: "center",
                                }}
                            >
                                <a
                                    href="#"
                                    style={{ backgroundColor: "#000000", color: "#ffffff" }}
                                    className="navbar-cta"
                                >
                                    See all Partners
                                </a>
                            </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Partners CTA */}
      <div
        className="soft-cta"
        style={{
          marginBottom: "60px",
          backgroundColor: "#08258e",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#ffffff" }}>Want to Partner with Us?</h2>
        <p style={{ color: "#ffffff" }}>
          Join our growing network of collaborators who believe in innovation,
          creativity, and building impactful tech together.Let’s create
          something meaningful together. At D'roid Technologies, we’re always
          open to partnerships that align with our mission to drive digital
          progress.
        </p>
        <button
          className="soft-cta-button"
          onClick={() => {
            store.dispatch(updateModal(true));
            store.dispatch(
              updateModalContent({
                appTitle: "Become a Partner",
                appBody: (
                  <>
                   
                    <p style={{ color: "#000000" }}>
                      Fill in the form below and our partnership team will get
                      back to you.
                    </p>
                    <ContactPartnersClients />
                  </>
                ),
              })
            );
          }}
        >
          Partner With Us →
        </button>
      </div>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="wrapper">
          <div className="block-12" style={{ textAlign: "center" }}>
            <span className="title_span" style={{ marginTop: "20px" }}>
              Clients
            </span>
            <br />
            <h2 className="partners-h1">Meet Our Clients</h2>
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
                {clientLogos.map((logo, index) => (
                  <div key={index} className="partners-logo-wrapper">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="partners-logo"
                    />
                  </div>
                ))}
              </div>

              {/* <div
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                    marginTop: "30px",
                                    justifyContent: "center",
                                }}
                            >
                                <a
                                    href="#"
                                    style={{ backgroundColor: "#000000", color: "#ffffff" }}
                                    className="navbar-cta"
                                >
                                    See all Partners
                                </a>
                            </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {/* <div style={{ padding: "3rem 2rem", backgroundColor: "#fff" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "2rem",
            color: "#000000",
          }}
        >
          Our Works
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {["client1", "client2", "client3", "client4"].map((client, idx) => (
            <img
              key={idx}
              src={`/images/clients/${client}.png`}
              alt={`Client ${idx + 1}`}
              style={{ width: "120px", height: "auto", opacity: 0.8 }}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default PartnersClients;

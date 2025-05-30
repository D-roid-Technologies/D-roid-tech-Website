// @ts-nocheck

import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { Assets } from "../../../utils/constant/Assets";
import "./PrivacyPolicy.css";

const PrivacyPolicy: React.FunctionComponent = () => {
  const { getColor } = useThemeColor();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F9F9F9",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#071D6A",
          color: "#FFFFFF",
          padding: "20px",
          position: "relative",
        }}
      >
        <a
          href="/"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "#FFFFFF",
            textDecoration: "none",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Home
        </a>
        <h1 className="privacy-page-heading">Privacy Policy</h1>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: "1",
          backgroundColor: "#FFFFFF",
          padding: "40px",
          overflowY: "auto",
        }}
      >
        <h2 className="privacy-subheading">Introduction</h2>
        <p className="privacy-description">
          D'roid Technologies International ("we", "our", "us") is committed to
          protecting and respecting your privacy. This Privacy Policy outlines
          the types of information we collect from you, how we use it, and the
          measures we take to protect it. By using our services, you agree to
          the collection and use of information in accordance with this policy.
        </p>

        <h2 className="privacy-subheading">Information We Collect</h2>
        <h3 style={{ fontSize: "20px", color: "#071D6A" }}>
          Personal Information
        </h3>
        <p className="privacy-description">
          We may collect the following personal information from you:
          <ul className="privacy-item">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing address</li>
            <li>Payment information</li>
            <li>User account details</li>
          </ul>
        </p>

        <h3 className="privacy-subheading">Non-Personal Information</h3>
        <p className="privacy-description">
          <ul className="privacy-item">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages visited on our site</li>
            <li>Time and date of visit</li>
            <li>Time spent on each page</li>
            <li>Other diagnostic data</li>
          </ul>
        </p>

        <h2 className="privacy-subheading">How We Use Your Information</h2>
        <p className="privacy-description">
          <ul className="privacy-item">
            <li>To provide and maintain our services</li>
            <li>To process transactions and manage your account</li>
            <li>To improve our services and website</li>
            <li>
              To communicate with you, including responding to inquiries and
              providing customer support
            </li>
            <li>
              To send you promotional materials and updates (with your consent)
            </li>
            <li>To analyze website usage and improve user experience</li>
            <li>
              To enforce our terms and conditions and comply with legal
              obligations
            </li>
          </ul>
        </p>

        <h2 className="privacy-subheading">Sharing Your Information</h2>
        <p className="privacy-description">
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except in the following
          circumstances:
        </p>
        <div className="privacy-description">
          <ul className="privacy-item">
            <li>
              {" "}
              <strong>Service Providers</strong>: We may share your information
              with trusted third-party service providers who assist us in
              operating our website and conducting our business, as long as they
              agree to keep this information confidential.
            </li>
            <li>
              <strong>Legal Requirements</strong>: We may disclose your
              information if required by law or in response to valid requests by
              public authorities.
            </li>
            <li>
              <strong>Business Transfers</strong>: In the event of a merger,
              acquisition, or sale of assets, your information may be
              transferred to the new owner.
            </li>
          </ul>
        </div>

        <h2 className="privacy-subheading">Data Security</h2>
        <p className="privacy-description">
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. These measures include:
          </p>
          <ul className="privacy-item">
            <li>Secure server and network infrastructure</li>
            <li>Encryption of sensitive data</li>
            <li>Regular security audits and updates</li>
            <li>Access controls to personal information</li>
            <li>Employee training on data protection best practices</li>
          </ul>
          <p>
            However, please note that no method of transmission over the
            internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </p>

        <h2 className="privacy-subheading">Your Rights</h2>
        <p className="privacy-description">
          <ul className="privacy-item">
            <li>
              <strong>Access:</strong> You can request access to the personal
              information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request that we correct any
              inaccurate or incomplete information.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your
              personal information, subject to certain legal exceptions.
            </li>
            <li>
              <strong>Objection:</strong> You can object to the processing of
              your personal information in certain circumstances.
            </li>
            <li>
              <strong>Data Portability:</strong> You can request a copy of your
              personal information in a structured, commonly used, and
              machine-readable format.
            </li>
          </ul>{" "}
        </p>

        <h2 className="privacy-subheading">
          Cookies and Tracking Technologies
        </h2>
        <p className="privacy-description">
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience. Cookies are small files that a site or its
          service provider transfers to your computer's hard drive through your
          web browser (if you allow) that enables the site's or service
          provider's systems to recognize your browser and capture and remember
          certain information.
        </p>
        <p className="privacy-description">
          You can instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent. However, if you do not accept cookies,
          you may not be able to use some portions of our website.
        </p>

        <h2 className="privacy-subheading">Third-Party Links</h2>
        <p className="privacy-description">
          Our website may contain links to third-party sites that are not
          operated by us. If you click on a third-party link, you will be
          directed to that third party's site. We strongly advise you to review
          the Privacy Policy of every site you visit. We have no control over
          and assume no responsibility for the content, privacy policies, or
          practices of any third-party sites or services.
        </p>

        <h2 className="privacy-subheading">Changes to This Privacy Policy</h2>
        <p className="privacy-description">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
          Changes to this Privacy Policy are effective when they are posted on
          this page.
        </p>

        <h2 className="privacy-subheading">Contact Us</h2>
        <p className="privacy-description">
          <ul className="privacy-item">
            <li>
              By email:{" "}
              <a href="mailto:support@droid.com" style={{ color: "#479BE8" }}>
                support@droid.com
              </a>
            </li>
            <li>By phone: [Insert Contact Phone Number]</li>
            <li>By WhatsApp: [Insert Contact Address]</li>
          </ul>
        </p>
        <div style={{ marginTop: "20px" }}>
          <Button
            title="Contact Us"
            bgColor={"#071d6a"}
            color={Assets.colors.light}
            onClickButton={() => navigate("/contact")}
            mLeft={10}
            mRight={10}
            mTop={20}
            mBottom={0}
            fWeight={700}
            bRadius={10}
            bRadiusColor={Assets.colors.light}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

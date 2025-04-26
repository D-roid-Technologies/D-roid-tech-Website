// @ts-nocheck

import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { Assets } from "../../../utils/constant/Assets";

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
        <h1 style={{ textAlign: "center", fontSize: "32px", margin: "20px 0" }}>
          Privacy Policy
        </h1>
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
        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Introduction</h2>
        <p>
          D'roid Technologies International ("we", "our", "us") is committed to
          protecting and respecting your privacy. This Privacy Policy outlines the
          types of information we collect from you, how we use it, and the
          measures we take to protect it. By using our services, you agree to the
          collection and use of information in accordance with this policy.
        </p>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Information We Collect</h2>
        <h3 style={{ fontSize: "20px", color: "#071D6A" }}>Personal Information</h3>
        <p>
          We may collect the following personal information from you: <br />
          - Name <br />
          - Email address <br />
          - Phone number <br />
          - Mailing address <br />
          - Payment information <br />
          - User account details
        </p>

        <h3 style={{ fontSize: "20px", color: "#071D6A" }}>Non-Personal Information</h3>
        <p>
          We may also collect non-personal information, such as: <br />
          - Browser type and version <br />
          - Operating system <br />
          - Referring website <br />
          - Pages visited on our site <br />
          - Time and date of visit <br />
          - Time spent on each page <br />
          - Other diagnostic data
        </p>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>How We Use Your Information</h2>
        <p>
          We use the information we collect for various purposes, including: <br />
          - To provide and maintain our services <br />
          - To process transactions and manage your account <br />
          - To improve our services and website <br />
          - To communicate with you, including responding to inquiries and providing customer support <br />
          - To send you promotional materials and updates (with your consent) <br />
          - To analyze website usage and improve user experience <br />
          - To enforce our terms and conditions and comply with legal obligations
        </p>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Sharing Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except in the following
          circumstances:
        </p>
        <ul>
          <li>Service Providers: We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.</li>
          <li>Legal Requirements: We may disclose your information if required by law or in response to valid requests by public authorities.</li>
          <li>Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</li>
        </ul>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. These measures include: <br />
          - Secure server and network infrastructure <br />
          - Encryption of sensitive data <br />
          - Regular security audits and updates <br />
          - Access controls to personal information <br />
          - Employee training on data protection best practices <br />
          However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Your Rights</h2>
        <p>
          You have the following rights regarding your personal information: <br />
          - Access: You can request access to the personal information we hold about you. <br />
          - Correction: You can request that we correct any inaccurate or incomplete information. <br />
          - Deletion: You can request that we delete your personal information, subject to certain legal exceptions. <br />
          - Objection: You can object to the processing of your personal information in certain circumstances. <br />
          - Data Portability: You can request a copy of your personal information in a structured, commonly used, and machine-readable format.
        </p>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Cookies and Tracking Technologies</h2>
        <p>
          Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
        </p>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Third-Party Links</h2>
        <p>
          Our website may contain links to third-party sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <h2 style={{ fontSize: "24px", color: "#071D6A" }}>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us: <br />
          - By email: <a href="mailto:support@droid.com" style={{ color: "#479BE8" }}>support@droid.com</a> <br />
          - By phone: [Insert Contact Phone Number] <br />
          - By WhatsApp: [Insert Contact Address]
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

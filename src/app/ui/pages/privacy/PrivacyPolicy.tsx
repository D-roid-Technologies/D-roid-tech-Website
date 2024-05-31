import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import "./PrivacyPolicy.css";
import { useThemeColor } from "../../../utils/hooks/useThemeColor";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy: React.FunctionComponent = () => {
  const { getColor } = useThemeColor();
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="privacy-main">
        <div className="privacy-section">
          <div className="privacy-content">
            <div className="privacy-details">
              <h1
                className="privacy-subsection-heading"
                style={{ color: getColor("primary") }}
              >
                Privacy Policy
              </h1>
              <p
                className="paragraph"
                style={{ color: Assets.colors.paragraph, marginTop: "1rem" }}
              >
                D'roid Technologies International ("we", "our", "us") is
                committed to protecting and respecting your privacy. This
                Privacy Policy outlines the types of information we collect from
                you, how we use it, and the measures we take to protect it. By
                using our services, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-sections">
          <div className="privacy-subsection">
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              Information We Collect
            </h2>
            <div className="privacy-subsection-content">
              <h3
                className="privacy-subsection-subheading"
                style={{ color: getColor("primary") }}
              >
                Personal Information
              </h3>
              <p
                style={{ color: Assets.colors.paragraph }}
                className="paragraph"
              >
                We may collect the following personal information from you: -
                Name - Email address - Phone number - Mailing address - Payment
                information - User account details
              </p>
            </div>
            <div className="privacy-subsection-content">
              <h3
                className="privacy-subsection-subheading"
                style={{ color: getColor("primary") }}
              >
                Non-Personal Information
              </h3>
              <p
                style={{ color: Assets.colors.paragraph }}
                className="paragraph"
              >
                We may also collect non-personal information, such as: - Browser
                type and version - Operating system - Referring website - Pages
                visited on our site - Time and date of visit - Time spent on
                each page - Other diagnostic data
              </p>
            </div>
          </div>

          <div className="privacy-subsection">
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              How We Use Your Information
            </h2>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              We use the information we collect for various purposes, including:
              - To provide and maintain our services - To process transactions
              and manage your account - To improve our services and website - To
              communicate with you, including responding to inquiries and
              providing customer support - To send you promotional materials and
              updates (with your consent) - To analyze website usage and improve
              user experience - To enforce our terms and conditions and comply
              with legal obligations
            </p>
          </div>

          <div className="privacy-subsection">
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              Sharing Your Information
            </h2>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except in the
              following circumstances: - Service Providers: We may share your
              information with trusted third-party service providers who assist
              us in operating our website and conducting our business, as long
              as they agree to keep this information confidential. - Legal
              Requirements: We may disclose your information if required by law
              or in response to valid requests by public authorities. - Business
              Transfers: In the event of a merger, acquisition, or sale of
              assets, your information may be transferred to the new owner.
            </p>
          </div>

          <div className="privacy-subsection">
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              Data Security
            </h2>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              We implement a variety of security measures to maintain the safety
              of your personal information. These measures include: - Secure
              server and network infrastructure - Encryption of sensitive data -
              Regular security audits and updates - Access controls to personal
              information - Employee training on data protection best practices
              However, please note that no method of transmission over the
              internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div className="privacy-subsection">
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              Your Rights
            </h2>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              You have the following rights regarding your personal information:
              - Access: You can request access to the personal information we
              hold about you. - Correction: You can request that we correct any
              inaccurate or incomplete information. - Deletion: You can request
              that we delete your personal information, subject to certain legal
              exceptions. - Objection: You can object to the processing of your
              personal information in certain circumstances. - Data Portability:
              You can request a copy of your personal information in a
              structured, commonly used, and machine-readable format.
            </p>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              To exercise any of these rights, please contact us using the
              contact details provided below.
            </p>
          </div>

          <div className="privacy-subsection">
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              Cookies and Tracking Technologies
            </h2>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              Our website uses cookies and similar tracking technologies to
              enhance your browsing experience. Cookies are small files that a
              site or its service provider transfers to your computer's hard
              drive through your web browser (if you allow) that enables the
              site's or service provider's systems to recognize your browser and
              capture and remember certain information.
            </p>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our website.
            </p>
          </div>

          <div className="privacy-subsection">
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              Third-Party Links
            </h2>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              Our website may contain links to third-party sites that are not
              operated by us. If you click on a third-party link, you will be
              directed to that third party's site. We strongly advise you to
              review the Privacy Policy of every site you visit. We have no
              control over and assume no responsibility for the content, privacy
              policies, or practices of any third-party sites or services.
            </p>
          </div>

          <div className="privacy-subsection">
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              Changes to This Privacy Policy
            </h2>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </div>

          <div className="privacy-subsection" style={{ marginBottom: "1.5rem" }}>
            <h2
              className="privacy-subsection-heading"
              style={{ color: getColor("primary") }}
            >
              Contact Us
            </h2>
            <p
              className="privacy-subsection-content paragraph"
              style={{ color: Assets.colors.paragraph }}
            >
              If you have any questions about this Privacy Policy, please
              contact us: - By email: [Insert Contact Email] - By phone: [Insert
              Contact Phone Number] - By whatsApp: [Insert Contact Address]
            </p>
            <div style={{ width: "25%" }}>
              <Button
                title="Contact Us"
                bgColor={Assets.colors.secondary}
                color={Assets.colors.light}
                onClickButton={() => navigate("/contact")}
                mLeft={10}
                mRight={10}
                mTop={20}
                mBottom={0}
                bRadius={10}
                bRadiusColor={Assets.colors.light}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

import React from "react";
import "../Dashboard/WelcomePage.css";

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-container">
      <section className="welcome-section">
        <h2 className="welcome-heading">What is D'roid One?</h2>
        <p className="welcome-paragraph">
          The <strong>D'roid One Account</strong> is your personalized gateway
          into the D'roid Technologies ecosystem—designed to unify learning,
          work, productivity, entertainment, and community in one seamless
          digital experience.
        </p>
      </section>

      <section className="welcome-section">
        <h2 className="welcome-heading">What We Do</h2>
        <ul className="welcome-list">
          <li className="welcome-list-item">
            <strong>Smart Education:</strong> Courses, schedules, progress
            tracking, and K-Coin rewards via KnowledgeCity.
          </li>
          <li className="welcome-list-item">
            <strong>Workforce Tools:</strong> Time tracking, payslips,
            onboarding, and staff logs in one place.
          </li>
          <li className="welcome-list-item">
            <strong>Community Engagement:</strong> Join discussions, events,
            diaries, and announcements to stay connected.
          </li>
          <li className="welcome-list-item">
            <strong>Creative + Tech Tools:</strong> Explore music, tools,
            resources, and calculators to boost your creativity.
          </li>
          <li className="welcome-list-item">
            <strong>Opportunity Hub:</strong> Find job listings, events, and
            challenges through LunchBox.
          </li>
        </ul>
      </section>

      <section className="welcome-section">
        <h2 className="welcome-heading">Key Benefits</h2>
        <ul className="welcome-list">
          <li className="welcome-list-item">
            ✅ <strong>Unified Identity:</strong> One login for the entire
            ecosystem.
          </li>
          <li className="welcome-list-item">
            ✅ <strong>Productivity-Ready:</strong> Time management, task
            tracking, career tools.
          </li>
          <li className="welcome-list-item">
            ✅ <strong>Learning at Your Pace:</strong> Micro-courses to full
            programs with tracking and rewards.
          </li>
          <li className="welcome-list-item">
            ✅ <strong>K-Coin Rewards:</strong> Earn by engaging with tasks,
            content, and referrals.
          </li>
          <li className="welcome-list-item">
            ✅ <strong>Progress Visibility:</strong> Monitor your goals and
            growth in real-time.
          </li>
          <li className="welcome-list-item">
            ✅ <strong>Secure & Personal:</strong> Customizable, secure access
            tailored to your role.
          </li>
        </ul>
      </section>

      <section className="welcome-section">
        <h2 className="welcome-heading">Who Is It For?</h2>
        <ul className="welcome-list">
          <li className="welcome-list-item">
            <strong>Students</strong> seeking knowledge and career advancement.
          </li>
          <li className="welcome-list-item">
            <strong>Professionals & Interns</strong> balancing work and
            learning.
          </li>
          <li className="welcome-list-item">
            <strong>Creatives & Developers</strong> needing powerful tools and
            inspiration.
          </li>
          <li className="welcome-list-item">
            <strong>Teams & Organizations</strong> wanting a unified and
            efficient workspace.
          </li>
        </ul>
      </section>

      <section className="welcome-section">
        <h2 className="welcome-heading">Affiliated Apps</h2>
        <ul className="welcome-list">
          <li className="welcome-list-item">
            <strong>Knowledge City:</strong> Learn, earn, and grow with micro
            and macro learning experiences.
          </li>
          <li className="welcome-list-item">
            <strong>Muzik:</strong> Discover, share, and create music with
            powerful creative tools.
          </li>
          <li className="welcome-list-item">
            <strong>Nerves:</strong> Sell, and Buy from any place and time.
          </li>
          <li className="welcome-list-item">
            <strong>Schedules:</strong> Organize your time, tasks, classes, and
            team activities.
          </li>
          <li className="welcome-list-item">
            <strong>ToolBox:</strong> Access utilities for creativity,
            development, and innovation.
          </li>
          <li className="welcome-list-item">
            <strong>Calculate:</strong> Solve problems with specialized and
            everyday calculators.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default WelcomePage;

// import React from "react";
// import "../Dashboard/WelcomePage.css";

// const WelcomePage: React.FC = () => {
//   const containerStyle: React.CSSProperties = {
//     color: "#1f2937",
//     padding: "40px 20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     lineHeight: 1.6,
//     backgroundColor: "#f9fafb",
//     maxWidth: "800px",
//     margin: "0 auto",
//   };

//   const sectionStyle: React.CSSProperties = {
//     backgroundColor: "#ffffff",
//     borderRadius: "12px",
//     padding: "24px",
//     marginBottom: "24px",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//   };

//   const headingStyle: React.CSSProperties = {
//     fontSize: "24px",
//     fontWeight: 600,
//     marginBottom: "12px",
//     color: "#111827",
//   };

//   const paragraphStyle: React.CSSProperties = {
//     fontSize: "18px",
//     color: "#374151",
//     marginBottom: "12px",
//   };

//   const listStyle: React.CSSProperties = {
//     fontSize: "18px",
//     color: "#374151",
//     paddingLeft: "20px",
//   };

//   const listItemStyle: React.CSSProperties = {
//     marginBottom: "10px",
//   };

//   return (
//     <div style={containerStyle}>
//       <section style={sectionStyle}>
//         <h2 style={headingStyle}>What is D’roid One?</h2>
//         <p style={paragraphStyle}>
//           The <strong>D’roid One Account</strong> is your personalized gateway
//           into the D’roid Technologies ecosystem—designed to unify learning,
//           work, productivity, entertainment, and community in one seamless
//           digital experience.
//         </p>
//       </section>

//       <section style={sectionStyle}>
//         <h2 style={headingStyle}>What We Do</h2>
//         <ul style={listStyle}>
//           <li style={listItemStyle}>
//             <strong>Smart Education:</strong> Courses, schedules, progress
//             tracking, and K-Coin rewards via KnowledgeCity.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Workforce Tools:</strong> Time tracking, payslips,
//             onboarding, and staff logs in one place.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Community Engagement:</strong> Join discussions, events,
//             diaries, and announcements to stay connected.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Creative + Tech Tools:</strong> Explore music, tools,
//             resources, and calculators to boost your creativity.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Opportunity Hub:</strong> Find job listings, events, and
//             challenges through LunchBox.
//           </li>
//         </ul>
//       </section>

//       <section style={sectionStyle}>
//         <h2 style={headingStyle}>Key Benefits</h2>
//         <ul style={listStyle}>
//           <li style={listItemStyle}>
//             ✅ <strong>Unified Identity:</strong> One login for the entire
//             ecosystem.
//           </li>
//           <li style={listItemStyle}>
//             ✅ <strong>Productivity-Ready:</strong> Time management, task
//             tracking, career tools.
//           </li>
//           <li style={listItemStyle}>
//             ✅ <strong>Learning at Your Pace:</strong> Micro-courses to full
//             programs with tracking and rewards.
//           </li>
//           <li style={listItemStyle}>
//             ✅ <strong>K-Coin Rewards:</strong> Earn by engaging with tasks,
//             content, and referrals.
//           </li>
//           <li style={listItemStyle}>
//             ✅ <strong>Progress Visibility:</strong> Monitor your goals and
//             growth in real-time.
//           </li>
//           <li style={listItemStyle}>
//             ✅ <strong>Secure & Personal:</strong> Customizable, secure access
//             tailored to your role.
//           </li>
//         </ul>
//       </section>

//       <section style={sectionStyle}>
//         <h2 style={headingStyle}>Who Is It For?</h2>
//         <ul style={listStyle}>
//           <li style={listItemStyle}>
//             <strong>Students</strong> seeking knowledge and career advancement.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Professionals & Interns</strong> balancing work and
//             learning.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Creatives & Developers</strong> needing powerful tools and
//             inspiration.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Teams & Organizations</strong> wanting a unified and
//             efficient workspace.
//           </li>
//         </ul>
//       </section>

//       <section style={sectionStyle}>
//         <h2 style={headingStyle}>Affiliated Apps</h2>
//         <ul style={listStyle}>
//           <li style={listItemStyle}>
//             <strong>Knowledge City:</strong> Learn, earn, and grow with micro
//             and macro learning experiences.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Muzik:</strong> Discover, share, and create music with
//             powerful creative tools.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Nerves:</strong> Sell, and Buy from any place and time.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Schedules:</strong> Organize your time, tasks, classes, and
//             team activities.
//           </li>
//           <li style={listItemStyle}>
//             <strong>ToolBox:</strong> Access utilities for creativity,
//             development, and innovation.
//           </li>
//           <li style={listItemStyle}>
//             <strong>Calculate:</strong> Solve problems with specialized and
//             everyday calculators.
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default WelcomePage;

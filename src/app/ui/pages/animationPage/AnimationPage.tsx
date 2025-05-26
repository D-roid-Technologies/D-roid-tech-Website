import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { useNavigate } from "react-router-dom";

type Story = {
  title: string;
  description: string;
  videoUrl?: string;
  thumbnail?: string;
  releaseDate: string;
  summary: string;
  url: string;
  category?: "Animated" | "Shorts" | "Novels";
};

const stories: Story[] = [
  {
    title: "Brothers",
    description:
      "An emotional animated story following two siblings separated by enemy invasion. Forced to navigate a dangerous world alone, their unbreakable bond transcends distance and time. A tale of survival, hope, and the enduring strength of family ties that proves love conquers all obstacles.",
    releaseDate: "March 5, 2025",
    summary:
      "Two brothers, separated by an enemy invasion, embark on separate journeys and are reunited in an unexpected way, discovering the strength of family and destiny along the way.",
    url: "/stories/brothers",
    category: "Animated",
    thumbnail: Assets.images.brothers,
  },
  {
    title: "City Boys",
    description:
      "A high-stakes animated exploration of young, ambitious individuals obsessed with wealth and status. In a world where money reigns supreme, these 'City Boys' discover the true cost of success and whether material gain is worth sacrificing human connection and happiness.",
    releaseDate: "February 10, 2025",
    summary:
      "A group of ambitious young men obsessed with wealth and status learn the cost of living in a world where money is everything, and nothing is as valuable as it seems.",
    url: "/stories/city-boys",
    category: "Animated",
    thumbnail: Assets.images.cityboys,
  },
  {
    title: "Immaculate",
    description:
      "A powerful animated story about an African woman born with sickle cell disease. Despite facing constant challenges and societal stigma, she embodies resilience and strength, working to inspire others while fighting for awareness and acceptance in a world that doesn't understand her struggles.",
    releaseDate: "January 20, 2025",
    summary:
      "A young African female born with sickle cell disease overcomes societal stigma and personal challenges to inspire hope and empowerment in others facing similar struggles.",
    url: "/stories/immaculate",
    category: "Animated",
    thumbnail: Assets.images.immaclate,
  },
  {
    title: "Warriors",
    description:
      "An epic animated saga about a powerful clan that rises to become the strongest force on the planet through determination and unity. Their journey explores themes of loyalty, sacrifice, and perseverance as they prove that nothing is impossible when a community unites with shared purpose.",
    releaseDate: "January 20, 2025",
    summary:
      "A determined clan rises from humble beginnings to become the strongest force on the planet through unity, sacrifice, and unwavering perseverance.",
    url: "/stories/warriors",
    category: "Animated",
    thumbnail: Assets.images.warriors,
  },
];

const AnimationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStoryClick = (story: Story) => {
    navigate(story.url);
  };

  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${Assets.images.homeBannerSlideThree})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "60px",
        }}
      >
        <div className="wrapper">
          <div>
            <h1 style={{ fontSize: "4rem", color: "#fff", fontWeight: 800 }}>
              Animation & Short Stories
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#eee",
                maxWidth: "600px",
                marginTop: "1rem",
              }}
            >
              Original stories told through motion, creativity, and a dash of
              code. Brought to you by the storytellers at D'roid.
            </p>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="wrapper soft-wrapper">
        <span
          className="soft-dev-header title_span"
          style={{ background: "#e2e8f0" }}
        >
          Featured Stories
        </span>
        <div className="soft-dev-content">
          {stories.map((story, index) => (
            <div
              key={index}
              onClick={() => handleStoryClick(story)}
              style={{ cursor: "pointer" }}
            >
              <CoreValueCardTwo
                title={story.title}
                description={story.description}
                imageSrc={story.thumbnail}
                url={story.url}
                className="process-card"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        style={{
          backgroundColor: "#071d6a",
          padding: "50px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Let's Animate Your Story!
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
          We collaborate with creatives to turn scripts into immersive visual
          experiences.
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-block",
            backgroundColor: "#fff",
            color: "#071d6a",
            padding: "12px 30px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
        >
          Collaborate With Us
        </a>
      </div>
    </div>
  );
};

export default AnimationPage;

// import React from "react";
// import NavBar from "../../components/navbar/NavBar";
// import { Assets } from "../../../utils/constant/Assets";
// import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
// import { useNavigate } from "react-router-dom";

// type Story = {
//   title: string;
//   description: string;
//   videoUrl?: string;
//   thumbnail?: string;
//   releaseDate: string;
//   summary: string;
//   url: string;
//   category?: "Animated" | "Shorts" | "Novels";
// };

// const stories: Story[] = [
//   {
//     title: "Brothers",
//     description:
//       "Brothers is an emotional and captivating animated story that follows the journey of two siblings who are forced to leave their home after a devastating enemy invasion. Separated in the chaos of the attack, the brothers are left to navigate a world filled with danger, loss, and uncertainty. Their paths diverge as they struggle to survive in the harsh new reality, each haunted by the memories of their past and the hope of reuniting with the other. As time passes, they each grow stronger, both physically and emotionally, adapting to their circumstances and overcoming various obstacles. The heart of the story lies in their bond — a connection that never fades, no matter the distance or challenges that separate them. The brothers' eventual reunion comes in an unexpected and heartfelt way, illustrating the power of perseverance, hope, and family ties. This story explores themes of survival, the emotional toll of war, and the unwavering strength of sibling love, reminding us that no matter how far we drift, the ties that bind us are often stronger than we realize.",
//     releaseDate: "March 5, 2025",
//     summary:
//       "Two brothers, separated by an enemy invasion, embark on separate journeys and are reunited in an unexpected way, discovering the strength of family and destiny along the way.",
//     url: "/stories/brothers",
//     category: "Animated",
//     thumbnail: Assets.images.brothers,
//   },
//   {
//     title: "City Boys",
//     description:
//       "City Boys is an animated exploration of the high-stakes, high-pressure world where money reigns supreme. It follows the lives of a group of young, ambitious individuals who place their worth and success in the hands of wealth. Obsessed with power, status, and material possessions, these “City Boys” will stop at nothing to maintain their image and climb the social ladder. The story paints a vivid picture of their fast-paced lifestyles, their struggles with moral dilemmas, and the impact of their decisions on both themselves and those around them. It’s a tale of excess, greed, and the dangerous game of living in a world where everything is driven by financial gain. Ultimately, the show questions what it means to truly have it all and whether the pursuit of wealth is worth the cost of human connection and happiness.",
//     releaseDate: "February 10, 2025",
//     summary:
//       "A group of ambitious young men obsessed with wealth and status learn the cost of living in a world where money is everything, and nothing is as valuable as it seems.",
//     url: "/stories/city-boys",
//     category: "Animated",
//     thumbnail: Assets.images.cityboys,
//   },
//   {
//     title: "Immaculate",
//     description:
//       "Immaculate is a powerful and moving animated story about an African female born with sickle cell disease, a condition that defines much of her life and journey. From a young age, she faces the challenges of managing her health, enduring constant pain, and battling societal stigma. Despite the difficulties, she embodies strength and resilience, learning to navigate a world that doesn't always understand her struggles. The story delves into themes of personal empowerment, self-acceptance, and the fight for awareness, showing how one young woman defies expectations and rises above her limitations. Her journey is one of hope, as she works not only to conquer her own challenges but also to inspire others to embrace their own unique battles with courage and grace.",
//     releaseDate: "January 20, 2025",
//     summary:
//       "A young African female born with sickle cell disease overcomes societal stigma and personal challenges to inspire hope and empowerment in others facing similar struggles.",
//     url: "/stories/immaculate",
//     category: "Animated",
//     thumbnail: Assets.images.immaclate,
//   },
//   {
//     title: "Warriors",
//     description:
//       "Warriors is an epic animated saga about a powerful clan that, through sheer determination and willpower, rises to become the strongest force on the planet. The story centers on a people who, once underestimated and outnumbered, have transformed themselves into a force to be reckoned with. Driven by an unwavering commitment to protect their homeland and values, they undergo rigorous training, sharpen their combat skills, and cultivate an unbreakable unity. The Warriors' journey is filled with countless battles, both internal and external, as they fight to preserve their legacy and honor. The story explores themes of loyalty, sacrifice, perseverance, and the relentless pursuit of greatness. Through grit and resilience, the Warriors prove that nothing is impossible when a community comes together with a shared purpose and unyielding determination.",
//     releaseDate: "January 20, 2025",
//     summary:
//       "A determined clan rises from humble beginnings to become the strongest force on the planet through unity, sacrifice, and unwavering perseverance.",
//     url: "/stories/warriors",
//     category: "Animated",
//     thumbnail: Assets.images.warriors,
//   },
// ];

// const AnimationPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleStoryClick = (story: Story) => {
//     navigate(story.url);
//   };

//   return (
//     <div>
//       <NavBar />

//       {/* Hero Section */}
//       <div
//         style={{
//           backgroundImage: `url(${Assets.images.homeBannerSlideThree})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "60vh",
//           display: "flex",
//           alignItems: "center",
//           paddingLeft: "60px",
//         }}
//       >
//         <div className="wrapper">
//           <div>
//             <h1 style={{ fontSize: "4rem", color: "#fff", fontWeight: 800 }}>
//               Animation & Short Stories
//             </h1>
//             <p
//               style={{
//                 fontSize: "1.25rem",
//                 color: "#eee",
//                 maxWidth: "600px",
//                 marginTop: "1rem",
//               }}
//             >
//               Original stories told through motion, creativity, and a dash of
//               code. Brought to you by the storytellers at D'roid.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stories Section */}
//       <div className="wrapper soft-wrapper">
//         <span
//           className="soft-dev-header title_span"
//           style={{ background: "#e2e8f0" }}
//         >
//           Featured Stories
//         </span>
//         <div className="soft-dev-content">
//           {stories.map((story, index) => (
//             <div
//               key={index}
//               onClick={() => handleStoryClick(story)}
//               style={{ cursor: "pointer" }}
//             >
//               <CoreValueCardTwo
//                 title={story.title}
//                 description={story.description}
//                 imageSrc={story.thumbnail}
//                 url={story.url}
//                 className="process-card"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Call to Action Section */}
//       <div
//         style={{
//           backgroundColor: "#071d6a",
//           padding: "50px",
//           textAlign: "center",
//           color: "#fff",
//         }}
//       >
//         <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
//           Let's Animate Your Story!
//         </h2>
//         <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
//           We collaborate with creatives to turn scripts into immersive visual
//           experiences.
//         </p>
//         <a
//           href="/contact"
//           style={{
//             display: "inline-block",
//             backgroundColor: "#fff",
//             color: "#071d6a",
//             padding: "12px 30px",
//             borderRadius: "6px",
//             textDecoration: "none",
//             fontWeight: "600",
//             transition: "all 0.3s ease",
//           }}
//         >
//           Collaborate With Us
//         </a>
//       </div>
//     </div>
//   );
// };

// export default AnimationPage;

// import React from "react";
// import NavBar from "../../components/navbar/NavBar";
// import { Assets } from "../../../utils/constant/Assets";
// import { url } from "inspector";
// import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
// import { useNavigate } from "react-router-dom";

// type Story = {
//   title: string;
//   description: string;
//   videoUrl?: string; // If you embed videos or animations
//   thumbnail?: string; // Optional image preview
//   releaseDate: string;
//   summary: string;
//   url: string;
//   category?: "Animated" | "Shorts" | "Novels";
// };

// const stories: Story[] = [
//   {
//     title: "Brothers",
//     description:
//       "Brothers is an emotional and captivating animated story that follows the journey of two siblings who are forced to leave their home after a devastating enemy invasion. Separated in the chaos of the attack, the brothers are left to navigate a world filled with danger, loss, and uncertainty. Their paths diverge as they struggle to survive in the harsh new reality, each haunted by the memories of their past and the hope of reuniting with the other. As time passes, they each grow stronger, both physically and emotionally, adapting to their circumstances and overcoming various obstacles. The heart of the story lies in their bond — a connection that never fades, no matter the distance or challenges that separate them. The brothers’ eventual reunion comes in an unexpected and heartfelt way, illustrating the power of perseverance, hope, and family ties. This story explores themes of survival, the emotional toll of war, and the unwavering strength of sibling love, reminding us that no matter how far we drift, the ties that bind us are often stronger than we realize.",
//     releaseDate: "March 5, 2025",
//     summary:
//       "Two brothers, separated by an enemy invasion, embark on separate journeys and are reunited in an unexpected way, discovering the strength of family and destiny along the way.",
//     url: "/stories/bug-learns-to-code",
//     category: "Animated",
//     thumbnail: Assets.images.brothers,
//   },
//   {
//     title: "City Boys",
//     description:
//       "City Boys is an animated exploration of the high-stakes, high-pressure world where money reigns supreme. It follows the lives of a group of young, ambitious individuals who place their worth and success in the hands of wealth. Obsessed with power, status, and material possessions, these “City Boys” will stop at nothing to maintain their image and climb the social ladder. The story paints a vivid picture of their fast-paced lifestyles, their struggles with moral dilemmas, and the impact of their decisions on both themselves and those around them. It’s a tale of excess, greed, and the dangerous game of living in a world where everything is driven by financial gain. Ultimately, the show questions what it means to truly have it all and whether the pursuit of wealth is worth the cost of human connection and happiness.",
//     releaseDate: "February 10, 2025",
//     summary:
//       "A group of ambitious young men obsessed with wealth and status learn the cost of living in a world where money is everything, and nothing is as valuable as it seems.",
//     url: "/stories/designers-in-metaverse",
//     category: "Animated",
//     thumbnail: Assets.images.cityboys,
//   },
//   {
//     title: "Immaculate",
//     description:
//       "Immaculate is a powerful and moving animated story about an African female born with sickle cell disease, a condition that defines much of her life and journey. From a young age, she faces the challenges of managing her health, enduring constant pain, and battling societal stigma. Despite the difficulties, she embodies strength and resilience, learning to navigate a world that doesn't always understand her struggles. The story delves into themes of personal empowerment, self-acceptance, and the fight for awareness, showing how one young woman defies expectations and rises above her limitations. Her journey is one of hope, as she works not only to conquer her own challenges but also to inspire others to embrace their own unique battles with courage and grace.",
//     releaseDate: "January 20, 2025",
//     summary:
//       "A young African female born with sickle cell disease overcomes societal stigma and personal challenges to inspire hope and empowerment in others facing similar struggles.",
//     url: "/stories/ai-finds-soul",
//     category: "Animated",
//     thumbnail: Assets.images.immaclate,
//   },
//   {
//     title: "Warriors",
//     description:
//       "Warriors is an epic animated saga about a powerful clan that, through sheer determination and willpower, rises to become the strongest force on the planet. The story centers on a people who, once underestimated and outnumbered, have transformed themselves into a force to be reckoned with. Driven by an unwavering commitment to protect their homeland and values, they undergo rigorous training, sharpen their combat skills, and cultivate an unbreakable unity. The Warriors' journey is filled with countless battles, both internal and external, as they fight to preserve their legacy and honor. The story explores themes of loyalty, sacrifice, perseverance, and the relentless pursuit of greatness. Through grit and resilience, the Warriors prove that nothing is impossible when a community comes together with a shared purpose and unyielding determination.",
//     releaseDate: "January 20, 2025",
//     summary:
//       "A determined clan rises from humble beginnings to become the strongest force on the planet through unity, sacrifice, and unwavering perseverance.",
//     url: "/stories/ai-finds-soul",
//     category: "Animated",
//     thumbnail: Assets.images.warriors,
//   },
// ];

// const AnimationPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleTechnologyClick = (tech: {
//     releaseDate?: string;
//     title?: string;
//     description?: string;
//     thumbnail?: any;
//     url: any;
//   }) => {
//     navigate(tech.url);
//   };
//   return (
//     <div>
//       <NavBar />

//       {/* Hero Section */}
//       <div
//         style={{
//           backgroundImage: `url(${Assets.images.homeBannerSlideThree})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "60vh",
//           display: "flex",
//           alignItems: "center",
//           paddingLeft: "60px",
//         }}
//       >
//         <div className="wrapper">
//           <div>
//             <h1 style={{ fontSize: "4rem", color: "#fff", fontWeight: 800 }}>
//               Animation & Short Stories
//             </h1>
//             <p
//               style={{
//                 fontSize: "1.25rem",
//                 color: "#eee",
//                 maxWidth: "600px",
//               }}
//             >
//               Original stories told through motion, creativity, and a dash of
//               code. Brought to you by the storytellers at D'roid.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stories Section */}
//       <div className="wrapper soft-wrapper">
//         <span
//           className="soft-dev-header title_span"
//           style={{ background: "#e2e8f0" }}
//         >
//           Featured Stories
//         </span>
//         <div className="soft-dev-content">
//           {stories.map((tech, index) => (
//             <div
//               key={index}
//               onClick={() => handleTechnologyClick(tech)}
//               style={{ cursor: "pointer" }}
//             >
//               <CoreValueCardTwo
//                 key={index}
//                 title={tech.title}
//                 description={tech.description}
//                 imageSrc={tech.thumbnail}
//                 // releaseDate={tech.releaseDate}
//                 url={tech.url}
//                 className="process-card"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* <div className="wrapper" style={{ padding: "40px" }}>
//         <h2 style={{ marginBottom: "30px" }}>Featured Stories</h2> */}
//       {/* <div
//           style={{
//             display: "grid",
//             gap: "30px",
//             gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//           }}
//         >
//           {stories.map((story, idx) => (
//             <div
//               key={idx}
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 backgroundColor: "#fff",
//               }}
//             >
//               <div
//                 style={{
//                   height: "150px",
//                   backgroundColor: "#f3f3f3",
//                   backgroundImage: `url(${story.thumbnail})`,
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   backgroundSize: "cover",
//                 }}
//               >
//                 <span
//                   style={{
//                     marginTop: "60px",
//                     padding: "8px",
//                     backgroundColor: "red",
//                   }}
//                 >
//                   {story.category}
//                 </span>
//               </div>
//               <div style={{ padding: "20px" }}>
//                 <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
//                   {story.title}
//                 </h3>
//                 <p style={{ margin: "10px 0", color: "#555" }}>
//                   {story.summary}
//                 </p>
//                 <span style={{ fontSize: "0.9rem", color: "#999" }}>
//                   {story.releaseDate}
//                 </span>
//                 <div
//                   style={{
//                     marginTop: "10px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     fontSize: "11px",
//                   }}
//                 >
//                   <a href={story.url} style={{ color: "#007bff" }}>
//                     Start Watching →
//                   </a>
//                   <a href={story.url} style={{ color: "#007bff" }}>
//                     Start Reading→
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         mmm */}
//       {/* </div> */}

//       {/* CTA */}
//       <div
//         style={{
//           backgroundColor: "#071d6a",
//           padding: "50px",
//           textAlign: "center",
//           color: "#fff",
//         }}
//       >
//         <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
//           Let's Amnimate your Story!
//         </h2>
//         <p style={{ fontSize: "1.1rem" }}>
//           We collaborate with creatives to turn scripts into immersive visual
//           experiences.
//         </p>
//         <a
//           href="/contact"
//           style={{
//             marginTop: "20px",
//             display: "inline-block",
//             backgroundColor: "#fff",
//             color: "#071d6a",
//             padding: "10px 25px",
//             borderRadius: "6px",
//             textDecoration: "none",
//             fontWeight: "600",
//           }}
//         >
//           Collaborate With Us
//         </a>
//       </div>
//     </div>
//   );
// };

// export default AnimationPage;

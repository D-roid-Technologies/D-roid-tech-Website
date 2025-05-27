import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";
import CoreValueCardTwo from "../../components/CoreValueCard/CoreValueCardTwo";
import { useNavigate } from "react-router-dom";

export interface Story {
  id: string;
  title: string;
  genre: string;
  runtime: string;
  releaseDate: string;
  category: string;
  thumbnail: string;
  synopsis: string;
  storyArc: string;
  themes: string[];
  visualStyle: string;
  targetAudience: string;
  url: string; // Added missing url property
  description: string; // Added missing description property
  additionalInfo?: {
    characterDynamics?: string;
    socialCommentary?: string;
    visualInnovation?: string;
    culturalRelevance?: string;
    medicalAccuracy?: string;
    characterDevelopment?: string;
    culturalContext?: string;
    visualMetaphors?: string;
    impactAdvocacy?: string;
    worldBuilding?: string;
    trainingSequences?: string;
    philosophyOfStrength?: string;
    battleChoreography?: string;
    leadershipSacrifice?: string;
    visualSpectacle?: string;
  };
}

const stories: Story[] = [
  {
    id: "brothers",
    title: "Brothers",
    genre: "Emotional Drama / Adventure",
    runtime: "45 minutes",
    releaseDate: "March 5, 2025",
    category: "Animated Feature",
    thumbnail: Assets.images.brothers,
    url: "/stories/brothers",
    description:
      "A deeply moving animated tale that explores the unbreakable bond between siblings in the face of unimaginable adversity. When a devastating enemy invasion tears through their homeland, two young brothers are violently separated during the chaos of evacuation.",
    synopsis:
      "Brothers is a deeply moving animated tale that explores the unbreakable bond between siblings in the face of unimaginable adversity. When a devastating enemy invasion tears through their homeland, two young brothers are violently separated during the chaos of evacuation. What follows is a parallel journey of survival, growth, and the enduring power of family love that transcends physical distance.",
    storyArc:
      "The narrative unfolds across two interconnected storylines, following each brother as they navigate their harsh new realities. The elder brother, forced to mature rapidly, becomes a protector for other displaced children, channeling his pain into purpose. Meanwhile, the younger brother discovers inner strength he never knew he possessed, learning to survive in a world that has suddenly become hostile and unforgiving.",
    themes: [
      "Resilience: How trauma can forge unbreakable strength",
      "Hope: The light that guides us through the darkest moments",
      "Family Bonds: Love that endures beyond physical separation",
      "Coming of Age: Growing up when childhood is stolen away",
      "Redemption: Finding meaning in suffering",
    ],
    visualStyle:
      "The animation employs a distinctive art style that shifts between warm, golden memories of home and the stark, muted tones of their separated worlds. Character expressions are rendered with exceptional detail, capturing subtle emotions that drive the narrative forward. The reunion sequence features some of the most breathtaking animation work, using symbolism and visual metaphors to represent the invisible threads that connect family.",
    targetAudience:
      "While suitable for viewers 12 and above, Brothers resonates most powerfully with adults who understand the complexities of loss, separation, and the sacrifices made for family. The story doesn't shy away from difficult emotions but handles them with sensitivity and hope.",
  },
  {
    id: "cityBoys",
    title: "City Boys",
    genre: "Social Commentary / Urban Drama",
    runtime: "38 minutes",
    releaseDate: "February 10, 2025",
    category: "Animated Series Pilot",
    thumbnail: Assets.images.cityboys || Assets.images.cityboys || "",
    url: "/stories/city-boys",
    description:
      "A razor-sharp examination of modern urban culture through the lens of young men consumed by the pursuit of wealth, status, and material success. Set against the backdrop of a glittering metropolis, this animated exploration reveals the hidden costs of living in a world where your worth is measured by your wallet.",
    synopsis:
      "City Boys offers a razor-sharp examination of modern urban culture through the lens of young men consumed by the pursuit of wealth, status, and material success. Set against the backdrop of a glittering metropolis, this animated exploration reveals the hidden costs of living in a world where your worth is measured by your wallet.",
    storyArc:
      "The story follows five distinct characters, each representing different facets of urban ambition: Marcus (crypto trader), Devon (social media influencer), Kai (startup founder), Jamal (luxury car dealer), and Tyler (investment banker questioning everything).",
    themes: [
      "Materialism: The hidden costs of wealth-seeking behavior",
      "Social Media Culture: The gap between online personas and reality",
      "Modern Masculinity: Redefining success in contemporary society",
      "Systemic Pressure: Understanding what creates these personas",
      "Self-Worth: Finding value beyond external validation",
    ],
    visualStyle:
      "The animation incorporates elements of social media aesthetics, with characters occasionally breaking the fourth wall through phone screens and digital interfaces. Money is visualized as both alluring light and suffocating chains, creating a visual language that speaks to modern anxieties about success and self-worth.",
    targetAudience:
      "Primarily aimed at young adults (18-35) navigating modern urban life, career pressures, and social media culture. Appeals to viewers questioning traditional definitions of success.",
    additionalInfo: {
      characterDynamics:
        "Five distinct characters each representing different facets of urban ambition, from crypto trading to social media influence to startup culture.",
      socialCommentary:
        "Doesn't merely criticize wealth-seeking behavior but dissects the systemic pressures that create these personas, exploring how pursuit of external validation leads to internal emptiness.",
      visualInnovation:
        "Incorporates social media aesthetics with characters breaking the fourth wall through phone screens and digital interfaces.",
      culturalRelevance:
        "Addresses contemporary issues like cryptocurrency volatility, influencer culture, and the gig economy's impact on traditional career paths.",
    },
  },
  {
    id: "immaculate",
    title: "Immaculate",
    genre: "Biographical Drama / Medical",
    runtime: "42 minutes",
    releaseDate: "January 20, 2025",
    category: "Animated Documentary-Style Feature",
    thumbnail: Assets.images.immaclate || Assets.images.immaclate || "",
    url: "/stories/immaculate",
    description:
      "A powerful animated story about an African woman living with sickle cell disease. Despite facing constant challenges and societal stigma, she embodies resilience and strength, working to inspire others while fighting for awareness and acceptance in a world that doesn't understand her struggles.",
    synopsis:
      "Immaculate tells the inspiring true-to-life story of Amara, a young African woman living with sickle cell disease. This powerful animated feature chronicles her journey from childhood through adulthood, showcasing not just her medical struggles but her transformation into an advocate, educator, and symbol of hope for others facing similar challenges.",
    storyArc:
      "Amara's character arc spans two decades, showing her evolution from a confused child who doesn't understand why she's different, to a teenager struggling with identity and limitations, and finally to a confident woman who embraces her condition as part of her strength rather than just her struggle.",
    themes: [
      "Medical Awareness: Authentic representation of sickle cell disease",
      "Personal Growth: From confusion to advocacy and empowerment",
      "Cultural Stigma: Addressing misconceptions in various communities",
      "Healthcare Systems: Different cultural approaches to chronic conditions",
      "Resilience: Finding strength through struggle and community support",
    ],
    visualStyle:
      "The animation uses powerful visual metaphors to represent Amara's internal experience. Her blood cells are animated as tiny warriors in an ongoing battle, and pain is represented through color shifts and abstract sequences. Moments of triumph are celebrated with bursts of warm, golden animation.",
    targetAudience:
      "Educational and inspirational content suitable for viewers 12 and above, particularly valuable for patients, families, and healthcare professionals dealing with chronic conditions.",
    additionalInfo: {
      medicalAccuracy:
        "Takes great care to accurately represent sickle cell disease, working with medical consultants and patient advocates to ensure authentic portrayal.",
      characterDevelopment:
        "Character arc spans two decades showing evolution from confused child to confident advocate and educator.",
      culturalContext:
        "Set primarily in urban Nigeria with segments in London, exploring how different cultures and healthcare systems impact patients with chronic conditions.",
      visualMetaphors:
        "Blood cells animated as warriors, pain represented through color shifts, triumph celebrated with golden bursts.",
      impactAdvocacy:
        "Serves as advocacy tool with end credits featuring real patients and resources, developed in consultation with sickle cell organizations worldwide.",
    },
  },
  {
    id: "warriors",
    title: "Warriors",
    genre: "Epic Fantasy / Action Adventure",
    runtime: "52 minutes",
    releaseDate: "January 20, 2025",
    category: "Animated Epic",
    thumbnail: Assets.images.warriors || "",
    url: "/stories/warriors",
    description:
      "An epic animated saga about a powerful clan that rises to become the strongest force on the planet through determination and unity. Their journey explores themes of loyalty, sacrifice, and perseverance as they prove that nothing is impossible when a community unites with shared purpose.",
    synopsis:
      "Warriors presents an epic saga of the Ketu clan, a people who rise from the ashes of near-extinction to become the most formidable force on their world. This isn't just a story of physical strength, but of spiritual fortitude, community bonds, and the power of unified purpose in the face of seemingly impossible odds.",
    storyArc:
      "The Ketu people, once peaceful farmers, are forced to transform when their homeland is threatened by an alliance of aggressive neighboring clans. The story follows their gradual transformation from villagers to elite warriors, emphasizing that true strength comes from discipline, sacrifice, and mental fortitude.",
    themes: [
      "Transformation: From peaceful farmers to elite warriors",
      "Unity: The power of community bonds and unified purpose",
      "Protection: Fighting not for glory but to protect what you love",
      "Leadership: The sacrifices required for true leadership",
      "Spiritual Strength: Power that comes from connection to land and purpose",
    ],
    visualStyle:
      "The animation style blends realistic character design with stylized action sequences. The color palette shifts from earth tones in peaceful moments to dynamic, high-contrast schemes during battles. The warriors' spiritual connection to their land is visualized through subtle animation effects.",
    targetAudience:
      "Appeals to fans of epic fantasy and action adventure, suitable for viewers 13 and above who appreciate complex world-building and philosophical themes about strength and leadership.",
    additionalInfo: {
      worldBuilding:
        "Richly imagined world where different clans possess unique abilities and fighting styles, incorporating elements from various African warrior traditions while creating something original.",
      trainingSequences:
        "Training sequences choreographed like elaborate dances, showing how combat becomes an art form with gradual, believable character transformation.",
      philosophyOfStrength:
        "Explores different concepts of power, emphasizing that true warriors fight for protection and unity rather than aggression or conquest.",
      battleChoreography:
        "Meticulously animated action sequences drawing from various martial arts traditions while creating original fighting styles for each clan.",
      leadershipSacrifice:
        "Features multiple leaders contributing different strengths, exploring how leadership requires sacrifice and setting aside individual ambitions.",
      visualSpectacle:
        "Epic-scale animation with complex battle choreography, realistic character design with stylized action, and spiritual connection visualized through subtle effects.",
    },
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
              // key={story.id} // Using story.id instead of index for better React key
              // onClick={() => handleStoryClick(story)}
              // style={{ cursor: "pointer" }}
              key={index}
              onClick={() =>
                navigate("/animation/description", { state: story })
              }
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
// import { title } from "process";

// // type Story = {
// //   title: string;
// //   description: string;
// //   videoUrl?: string;
// //   thumbnail?: string;
// //   releaseDate: string;
// //   summary: string;
// //   url: string;
// //   category?: "Animated" | "Shorts" | "Novels";
// // };
// export interface Story {
//   // description: string;
//   // videoUrl?: string;
//   // summary: string;
//   // url: string;
//   id: string;
//   title: string;
//   genre: string;
//   runtime: string;
//   releaseDate: string;
//   category: string;
//   thumbnail: string;
//   synopsis: string;
//   storyArc: string;
//   themes: string[];
//   visualStyle: string;
//   targetAudience: string;
//   additionalInfo?: {
//     characterDynamics?: string;
//     socialCommentary?: string;
//     visualInnovation?: string;
//     culturalRelevance?: string;
//     medicalAccuracy?: string;
//     characterDevelopment?: string;
//     culturalContext?: string;
//     visualMetaphors?: string;
//     impactAdvocacy?: string;
//     worldBuilding?: string;
//     trainingSequences?: string;
//     philosophyOfStrength?: string;
//     battleChoreography?: string;
//     leadershipSacrifice?: string;
//     visualSpectacle?: string;
//   };
// }

// // const stories: Story[] = [
//   // const stories: Record<string, Story> = {
//     const stories: Story[] = [
//       {
//     // title: "Brothers",
//   // brothers: {
//     id: "brothers",
//     title: "Brothers",
//     genre: "Emotional Drama / Adventure",
//     runtime: "45 minutes",
//     releaseDate: "March 5, 2025",
//     category: "Animated Feature",
//     thumbnail: Assets.images.brothers,
//     synopsis: "Brothers is a deeply moving animated tale that explores the unbreakable bond between siblings in the face of unimaginable adversity. When a devastating enemy invasion tears through their homeland, two young brothers are violently separated during the chaos of evacuation. What follows is a parallel journey of survival, growth, and the enduring power of family love that transcends physical distance.",
//     storyArc: "The narrative unfolds across two interconnected storylines, following each brother as they navigate their harsh new realities. The elder brother, forced to mature rapidly, becomes a protector for other displaced children, channeling his pain into purpose. Meanwhile, the younger brother discovers inner strength he never knew he possessed, learning to survive in a world that has suddenly become hostile and unforgiving.",
//     themes: [
//       "Resilience: How trauma can forge unbreakable strength",
//       "Hope: The light that guides us through the darkest moments",
//       "Family Bonds: Love that endures beyond physical separation",
//       "Coming of Age: Growing up when childhood is stolen away",
//       "Redemption: Finding meaning in suffering"
//     ],
//     visualStyle: "The animation employs a distinctive art style that shifts between warm, golden memories of home and the stark, muted tones of their separated worlds. Character expressions are rendered with exceptional detail, capturing subtle emotions that drive the narrative forward. The reunion sequence features some of the most breathtaking animation work, using symbolism and visual metaphors to represent the invisible threads that connect family.",
//     targetAudience: "While suitable for viewers 12 and above, Brothers resonates most powerfully with adults who understand the complexities of loss, separation, and the sacrifices made for family. The story doesn't shy away from difficult emotions but handles them with sensitivity and hope."
//   },

//   {
//     // title: " CityBoys:",
//     id: "cityBoys",
//     title: "City Boys",
//     genre: "Social Commentary / Urban Drama",
//     runtime: "38 minutes",
//     releaseDate: "February 10, 2025",
//     category: "Animated Series Pilot",
//     thumbnail: Assets.images.cityBoys || "", // Add appropriate image reference
//     synopsis: "City Boys offers a razor-sharp examination of modern urban culture through the lens of young men consumed by the pursuit of wealth, status, and material success. Set against the backdrop of a glittering metropolis, this animated exploration reveals the hidden costs of living in a world where your worth is measured by your wallet.",
//     storyArc: "The story follows five distinct characters, each representing different facets of urban ambition: Marcus (crypto trader), Devon (social media influencer), Kai (startup founder), Jamal (luxury car dealer), and Tyler (investment banker questioning everything).",
//     themes: [
//       "Materialism: The hidden costs of wealth-seeking behavior",
//       "Social Media Culture: The gap between online personas and reality",
//       "Modern Masculinity: Redefining success in contemporary society",
//       "Systemic Pressure: Understanding what creates these personas",
//       "Self-Worth: Finding value beyond external validation"
//     ],
//     visualStyle: "The animation incorporates elements of social media aesthetics, with characters occasionally breaking the fourth wall through phone screens and digital interfaces. Money is visualized as both alluring light and suffocating chains, creating a visual language that speaks to modern anxieties about success and self-worth.",
//     targetAudience: "Primarily aimed at young adults (18-35) navigating modern urban life, career pressures, and social media culture. Appeals to viewers questioning traditional definitions of success.",
//     additionalInfo: {
//       characterDynamics: "Five distinct characters each representing different facets of urban ambition, from crypto trading to social media influence to startup culture.",
//       socialCommentary: "Doesn't merely criticize wealth-seeking behavior but dissects the systemic pressures that create these personas, exploring how pursuit of external validation leads to internal emptiness.",
//       visualInnovation: "Incorporates social media aesthetics with characters breaking the fourth wall through phone screens and digital interfaces.",
//       culturalRelevance: "Addresses contemporary issues like cryptocurrency volatility, influencer culture, and the gig economy's impact on traditional career paths."
//     }
//   },

//   {

//     id: "immaculate",
//     title: "Immaculate",
//     genre: "Biographical Drama / Medical",
//     runtime: "42 minutes",
//     releaseDate: "January 20, 2025",
//     category: "Animated Documentary-Style Feature",
//     thumbnail: Assets.images.immaculate || "", // Add appropriate image reference
//     synopsis: "Immaculate tells the inspiring true-to-life story of Amara, a young African woman living with sickle cell disease. This powerful animated feature chronicles her journey from childhood through adulthood, showcasing not just her medical struggles but her transformation into an advocate, educator, and symbol of hope for others facing similar challenges.",
//     storyArc: "Amara's character arc spans two decades, showing her evolution from a confused child who doesn't understand why she's different, to a teenager struggling with identity and limitations, and finally to a confident woman who embraces her condition as part of her strength rather than just her struggle.",
//     themes: [
//       "Medical Awareness: Authentic representation of sickle cell disease",
//       "Personal Growth: From confusion to advocacy and empowerment",
//       "Cultural Stigma: Addressing misconceptions in various communities",
//       "Healthcare Systems: Different cultural approaches to chronic conditions",
//       "Resilience: Finding strength through struggle and community support"
//     ],
//     visualStyle: "The animation uses powerful visual metaphors to represent Amara's internal experience. Her blood cells are animated as tiny warriors in an ongoing battle, and pain is represented through color shifts and abstract sequences. Moments of triumph are celebrated with bursts of warm, golden animation.",
//     targetAudience: "Educational and inspirational content suitable for viewers 12 and above, particularly valuable for patients, families, and healthcare professionals dealing with chronic conditions.",
//     additionalInfo: {
//       medicalAccuracy: "Takes great care to accurately represent sickle cell disease, working with medical consultants and patient advocates to ensure authentic portrayal.",
//       characterDevelopment: "Character arc spans two decades showing evolution from confused child to confident advocate and educator.",
//       culturalContext: "Set primarily in urban Nigeria with segments in London, exploring how different cultures and healthcare systems impact patients with chronic conditions.",
//       visualMetaphors: "Blood cells animated as warriors, pain represented through color shifts, triumph celebrated with golden bursts.",
//       impactAdvocacy: "Serves as advocacy tool with end credits featuring real patients and resources, developed in consultation with sickle cell organizations worldwide."
//     }
//   },

//    {
//     id: "warriors",
//     title: "Warriors",
//     genre: "Epic Fantasy / Action Adventure",
//     runtime: "52 minutes",
//     releaseDate: "January 20, 2025",
//     category: "Animated Epic",
//     thumbnail: Assets.images.warriors || "", // Add appropriate image reference
//     synopsis: "Warriors presents an epic saga of the Ketu clan, a people who rise from the ashes of near-extinction to become the most formidable force on their world. This isn't just a story of physical strength, but of spiritual fortitude, community bonds, and the power of unified purpose in the face of seemingly impossible odds.",
//     storyArc: "The Ketu people, once peaceful farmers, are forced to transform when their homeland is threatened by an alliance of aggressive neighboring clans. The story follows their gradual transformation from villagers to elite warriors, emphasizing that true strength comes from discipline, sacrifice, and mental fortitude.",
//     themes: [
//       "Transformation: From peaceful farmers to elite warriors",
//       "Unity: The power of community bonds and unified purpose",
//       "Protection: Fighting not for glory but to protect what you love",
//       "Leadership: The sacrifices required for true leadership",
//       "Spiritual Strength: Power that comes from connection to land and purpose"
//     ],
//     visualStyle: "The animation style blends realistic character design with stylized action sequences. The color palette shifts from earth tones in peaceful moments to dynamic, high-contrast schemes during battles. The warriors' spiritual connection to their land is visualized through subtle animation effects.",
//     targetAudience: "Appeals to fans of epic fantasy and action adventure, suitable for viewers 13 and above who appreciate complex world-building and philosophical themes about strength and leadership.",
//     additionalInfo: {
//       worldBuilding: "Richly imagined world where different clans possess unique abilities and fighting styles, incorporating elements from various African warrior traditions while creating something original.",
//       trainingSequences: "Training sequences choreographed like elaborate dances, showing how combat becomes an art form with gradual, believable character transformation.",
//       philosophyOfStrength: "Explores different concepts of power, emphasizing that true warriors fight for protection and unity rather than aggression or conquest.",
//       battleChoreography: "Meticulously animated action sequences drawing from various martial arts traditions while creating original fighting styles for each clan.",
//       leadershipSacrifice: "Features multiple leaders contributing different strengths, exploring how leadership requires sacrifice and setting aside individual ambitions.",
//       visualSpectacle: "Epic-scale animation with complex battle choreography, realistic character design with stylized action, and spiritual connection visualized through subtle effects."
//     }
//   }
// },
// ];
//   // {
//   //   title: "Brothers",
//   //   description:
//   //     "An emotional animated story following two siblings separated by enemy invasion. Forced to navigate a dangerous world alone, their unbreakable bond transcends distance and time. A tale of survival, hope, and the enduring strength of family ties that proves love conquers all obstacles.",
//   //   releaseDate: "March 5, 2025",
//   //   summary:
//   //     "Two brothers, separated by an enemy invasion, embark on separate journeys and are reunited in an unexpected way, discovering the strength of family and destiny along the way.",
//   //   url: "/stories/brothers",
//   //   category: "Animated",
//   //   thumbnail: Assets.images.brothers,
//   // },
//   // {
//   //   title: "City Boys",
//   //   description:
//   //     "A high-stakes animated exploration of young, ambitious individuals obsessed with wealth and status. In a world where money reigns supreme, these 'City Boys' discover the true cost of success and whether material gain is worth sacrificing human connection and happiness.",
//   //   releaseDate: "February 10, 2025",
//   //   summary:
//   //     "A group of ambitious young men obsessed with wealth and status learn the cost of living in a world where money is everything, and nothing is as valuable as it seems.",
//   //   url: "/stories/city-boys",
//   //   category: "Animated",
//   //   thumbnail: Assets.images.cityboys,
//   // },
//   // {
//   //   title: "Immaculate",
//   //   description:
//   //     "A powerful animated story about an African woman born with sickle cell disease. Despite facing constant challenges and societal stigma, she embodies resilience and strength, working to inspire others while fighting for awareness and acceptance in a world that doesn't understand her struggles.",
//   //   releaseDate: "January 20, 2025",
//   //   summary:
//   //     "A young African female born with sickle cell disease overcomes societal stigma and personal challenges to inspire hope and empowerment in others facing similar struggles.",
//   //   url: "/stories/immaculate",
//   //   category: "Animated",
//   //   thumbnail: Assets.images.immaclate,
//   // },
//   // {
//   //   title: "Warriors",
//   //   description:
//   //     "An epic animated saga about a powerful clan that rises to become the strongest force on the planet through determination and unity. Their journey explores themes of loyalty, sacrifice, and perseverance as they prove that nothing is impossible when a community unites with shared purpose.",
//   //   releaseDate: "January 20, 2025",
//   //   summary:
//   //     "A determined clan rises from humble beginnings to become the strongest force on the planet through unity, sacrifice, and unwavering perseverance.",
//   //   url: "/stories/warriors",
//   //   category: "Animated",
//   //   thumbnail: Assets.images.warriors,
//   // },

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

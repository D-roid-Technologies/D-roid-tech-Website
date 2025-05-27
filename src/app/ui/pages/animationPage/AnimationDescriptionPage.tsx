// AnimationDescriptionPage.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";

// Story interface (should match your main Story interface)
interface Story {
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
  url: string;
  description: string;
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

// Stories data (you can move this to a separate file if needed)
const storiesData: Record<string, Story> = {
  brothers: {
    id: "brothers",
    title: "Brothers",
    genre: "Emotional Drama / Adventure",
    runtime: "45 minutes",
    releaseDate: "March 5, 2025",
    category: "Animated Feature",
    thumbnail: "/path/to/brothers-thumbnail.jpg", // Update with actual path
    url: "/stories/brothers",
    description:
      "A deeply moving animated tale that explores the unbreakable bond between siblings in the face of unimaginable adversity.",
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
  cityboys: {
    id: "cityBoys",
    title: "City Boys",
    genre: "Social Commentary / Urban Drama",
    runtime: "38 minutes",
    releaseDate: "February 10, 2025",
    category: "Animated Series Pilot",
    thumbnail: "/path/to/cityboys-thumbnail.jpg", // Update with actual path
    url: "/stories/city-boys",
    description:
      "A razor-sharp examination of modern urban culture through the lens of young men consumed by the pursuit of wealth, status, and material success.",
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
  immaculate: {
    id: "immaculate",
    title: "Immaculate",
    genre: "Biographical Drama / Medical",
    runtime: "42 minutes",
    releaseDate: "January 20, 2025",
    category: "Animated Documentary-Style Feature",
    thumbnail: "/path/to/immaculate-thumbnail.jpg", // Update with actual path
    url: "/stories/immaculate",
    description:
      "A powerful animated story about an African woman living with sickle cell disease.",
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
  },
  warriors: {
    id: "warriors",
    title: "Warriors",
    genre: "Epic Fantasy / Action Adventure",
    runtime: "52 minutes",
    releaseDate: "January 20, 2025",
    category: "Animated Epic",
    thumbnail: "/path/to/warriors-thumbnail.jpg", // Update with actual path
    url: "/stories/warriors",
    description:
      "An epic animated saga about a powerful clan that rises to become the strongest force on the planet through determination and unity.",
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
  },
};

const AnimationDescriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId: string }>();

  // Get the story data based on the URL parameter or default to brothers
  const storyKey = storyId || "brothers";
  const storyData = storiesData[storyKey];

  // If story not found, show error or redirect
  if (!storyData) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
        <NavBar />
        <div style={{ padding: "2rem", textAlign: "center", color: "#333333" }}>
          <h1
            style={{ color: "#071d6a", fontSize: "2rem", marginBottom: "1rem" }}
          >
            Story Not Found
          </h1>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
            The requested story could not be found.
          </p>
          <button
            onClick={() => navigate("/animation")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#071d6a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            ← Back to Stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        // backgroundColor: "#ffffff",
        color: "#333333",
      }}
    >
      <NavBar />

      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "3rem 0",
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 16px",
                backgroundColor: "#071d6a",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ← Back to Stories
            </button>
          </div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#071d6a",
              marginBottom: "1rem",
            }}
          >
            {storyData.title}
          </h1>
          <p style={{ fontSize: "1.2rem", margin: "1rem 0", color: "#666666" }}>
            {storyData.genre} • {storyData.runtime} • {storyData.releaseDate}
          </p>
        </div>
      </div>

      {/* Story Details */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <img
              src={storyData.thumbnail}
              alt={storyData.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                backgroundColor: "#f0f0f0",
              }}
              onError={(e) => {
                // Handle broken image
                e.currentTarget.style.display = "none";
              }}
            />
            <div
              style={{
                marginTop: "1rem",
                padding: "1.5rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
              }}
            >
              <h4
                style={{
                  color: "#071d6a",
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                }}
              >
                Quick Info
              </h4>
              <p style={{ marginBottom: "0.5rem", color: "#333333" }}>
                <strong>Genre:</strong> {storyData.genre}
              </p>
              <p style={{ marginBottom: "0.5rem", color: "#333333" }}>
                <strong>Runtime:</strong> {storyData.runtime}
              </p>
              <p style={{ marginBottom: "0.5rem", color: "#333333" }}>
                <strong>Category:</strong> {storyData.category}
              </p>
              <p style={{ marginBottom: 0, color: "#333333" }}>
                <strong>Release:</strong> {storyData.releaseDate}
              </p>
            </div>
          </div>

          <div>
            <h2
              style={{
                color: "#071d6a",
                marginBottom: "1rem",
                fontSize: "2rem",
              }}
            >
              Synopsis
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginBottom: "2rem",
                color: "#333333",
              }}
            >
              {storyData.synopsis}
            </p>

            <h3
              style={{
                color: "#071d6a",
                marginBottom: "1rem",
                fontSize: "1.5rem",
              }}
            >
              Story Arc
            </h3>
            <p
              style={{
                lineHeight: "1.6",
                marginBottom: "2rem",
                color: "#333333",
              }}
            >
              {storyData.storyArc}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#071d6a",
              marginBottom: "1.5rem",
              fontSize: "1.5rem",
            }}
          >
            Themes & Emotional Depth
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {storyData.themes.map((theme, index) => (
              <div
                key={index}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  borderLeft: "4px solid #071d6a",
                  border: "1px solid #e9ecef",
                }}
              >
                <p style={{ margin: 0, fontWeight: "500", color: "#333333" }}>
                  {theme}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#071d6a",
              marginBottom: "1rem",
              fontSize: "1.5rem",
            }}
          >
            Visual Style
          </h3>
          <p
            style={{ lineHeight: "1.6", fontSize: "1.1rem", color: "#333333" }}
          >
            {storyData.visualStyle}
          </p>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              color: "#071d6a",
              marginBottom: "1rem",
              fontSize: "1.5rem",
            }}
          >
            Target Audience
          </h3>
          <p
            style={{ lineHeight: "1.6", fontSize: "1.1rem", color: "#333333" }}
          >
            {storyData.targetAudience}
          </p>
        </div>

        {/* Additional Info Section (if available) */}
        {storyData.additionalInfo && (
          <div style={{ marginBottom: "3rem" }}>
            <h3
              style={{
                color: "#071d6a",
                marginBottom: "1.5rem",
                fontSize: "1.5rem",
              }}
            >
              Additional Details
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
              }}
            >
              {Object.entries(storyData.additionalInfo).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <h5
                    style={{
                      color: "#071d6a",
                      marginBottom: "0.5rem",
                      textTransform: "capitalize",
                      fontSize: "1.1rem",
                    }}
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </h5>
                  <p style={{ margin: 0, fontSize: "1rem", color: "#333333" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Watch/Read Buttons */}
        <div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            border: "1px solid #e9ecef",
          }}
        >
          <h3
            style={{
              marginBottom: "1.5rem",
              color: "#071d6a",
              fontSize: "1.5rem",
            }}
          >
            Experience {storyData.title}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#071d6a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Watch Animation
            </button>
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#fff",
                color: "#071d6a",
                border: "2px solid #071d6a",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Read Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDescriptionPage;

// // AnimationDescriptionPage.tsx
// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import NavBar from "../../components/navbar/NavBar";

// // Story interface (should match your main Story interface)
// interface Story {
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
//   url: string;
//   description: string;
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

// // Stories data (you can move this to a separate file if needed)
// const storiesData: Record<string, Story> = {
//   brothers: {
//     id: "brothers",
//     title: "Brothers",
//     genre: "Emotional Drama / Adventure",
//     runtime: "45 minutes",
//     releaseDate: "March 5, 2025",
//     category: "Animated Feature",
//     thumbnail: "/path/to/brothers-thumbnail.jpg", // Update with actual path
//     url: "/stories/brothers",
//     description:
//       "A deeply moving animated tale that explores the unbreakable bond between siblings in the face of unimaginable adversity.",
//     synopsis:
//       "Brothers is a deeply moving animated tale that explores the unbreakable bond between siblings in the face of unimaginable adversity. When a devastating enemy invasion tears through their homeland, two young brothers are violently separated during the chaos of evacuation. What follows is a parallel journey of survival, growth, and the enduring power of family love that transcends physical distance.",
//     storyArc:
//       "The narrative unfolds across two interconnected storylines, following each brother as they navigate their harsh new realities. The elder brother, forced to mature rapidly, becomes a protector for other displaced children, channeling his pain into purpose. Meanwhile, the younger brother discovers inner strength he never knew he possessed, learning to survive in a world that has suddenly become hostile and unforgiving.",
//     themes: [
//       "Resilience: How trauma can forge unbreakable strength",
//       "Hope: The light that guides us through the darkest moments",
//       "Family Bonds: Love that endures beyond physical separation",
//       "Coming of Age: Growing up when childhood is stolen away",
//       "Redemption: Finding meaning in suffering",
//     ],
//     visualStyle:
//       "The animation employs a distinctive art style that shifts between warm, golden memories of home and the stark, muted tones of their separated worlds. Character expressions are rendered with exceptional detail, capturing subtle emotions that drive the narrative forward. The reunion sequence features some of the most breathtaking animation work, using symbolism and visual metaphors to represent the invisible threads that connect family.",
//     targetAudience:
//       "While suitable for viewers 12 and above, Brothers resonates most powerfully with adults who understand the complexities of loss, separation, and the sacrifices made for family. The story doesn't shy away from difficult emotions but handles them with sensitivity and hope.",
//   },
//   cityboys: {
//     id: "cityBoys",
//     title: "City Boys",
//     genre: "Social Commentary / Urban Drama",
//     runtime: "38 minutes",
//     releaseDate: "February 10, 2025",
//     category: "Animated Series Pilot",
//     thumbnail: "/path/to/cityboys-thumbnail.jpg", // Update with actual path
//     url: "/stories/city-boys",
//     description:
//       "A razor-sharp examination of modern urban culture through the lens of young men consumed by the pursuit of wealth, status, and material success.",
//     synopsis:
//       "City Boys offers a razor-sharp examination of modern urban culture through the lens of young men consumed by the pursuit of wealth, status, and material success. Set against the backdrop of a glittering metropolis, this animated exploration reveals the hidden costs of living in a world where your worth is measured by your wallet.",
//     storyArc:
//       "The story follows five distinct characters, each representing different facets of urban ambition: Marcus (crypto trader), Devon (social media influencer), Kai (startup founder), Jamal (luxury car dealer), and Tyler (investment banker questioning everything).",
//     themes: [
//       "Materialism: The hidden costs of wealth-seeking behavior",
//       "Social Media Culture: The gap between online personas and reality",
//       "Modern Masculinity: Redefining success in contemporary society",
//       "Systemic Pressure: Understanding what creates these personas",
//       "Self-Worth: Finding value beyond external validation",
//     ],
//     visualStyle:
//       "The animation incorporates elements of social media aesthetics, with characters occasionally breaking the fourth wall through phone screens and digital interfaces. Money is visualized as both alluring light and suffocating chains, creating a visual language that speaks to modern anxieties about success and self-worth.",
//     targetAudience:
//       "Primarily aimed at young adults (18-35) navigating modern urban life, career pressures, and social media culture. Appeals to viewers questioning traditional definitions of success.",
//     additionalInfo: {
//       characterDynamics:
//         "Five distinct characters each representing different facets of urban ambition, from crypto trading to social media influence to startup culture.",
//       socialCommentary:
//         "Doesn't merely criticize wealth-seeking behavior but dissects the systemic pressures that create these personas, exploring how pursuit of external validation leads to internal emptiness.",
//       visualInnovation:
//         "Incorporates social media aesthetics with characters breaking the fourth wall through phone screens and digital interfaces.",
//       culturalRelevance:
//         "Addresses contemporary issues like cryptocurrency volatility, influencer culture, and the gig economy's impact on traditional career paths.",
//     },
//   },
//   immaculate: {
//     id: "immaculate",
//     title: "Immaculate",
//     genre: "Biographical Drama / Medical",
//     runtime: "42 minutes",
//     releaseDate: "January 20, 2025",
//     category: "Animated Documentary-Style Feature",
//     thumbnail: "/path/to/immaculate-thumbnail.jpg", // Update with actual path
//     url: "/stories/immaculate",
//     description:
//       "A powerful animated story about an African woman living with sickle cell disease.",
//     synopsis:
//       "Immaculate tells the inspiring true-to-life story of Amara, a young African woman living with sickle cell disease. This powerful animated feature chronicles her journey from childhood through adulthood, showcasing not just her medical struggles but her transformation into an advocate, educator, and symbol of hope for others facing similar challenges.",
//     storyArc:
//       "Amara's character arc spans two decades, showing her evolution from a confused child who doesn't understand why she's different, to a teenager struggling with identity and limitations, and finally to a confident woman who embraces her condition as part of her strength rather than just her struggle.",
//     themes: [
//       "Medical Awareness: Authentic representation of sickle cell disease",
//       "Personal Growth: From confusion to advocacy and empowerment",
//       "Cultural Stigma: Addressing misconceptions in various communities",
//       "Healthcare Systems: Different cultural approaches to chronic conditions",
//       "Resilience: Finding strength through struggle and community support",
//     ],
//     visualStyle:
//       "The animation uses powerful visual metaphors to represent Amara's internal experience. Her blood cells are animated as tiny warriors in an ongoing battle, and pain is represented through color shifts and abstract sequences. Moments of triumph are celebrated with bursts of warm, golden animation.",
//     targetAudience:
//       "Educational and inspirational content suitable for viewers 12 and above, particularly valuable for patients, families, and healthcare professionals dealing with chronic conditions.",
//   },
//   warriors: {
//     id: "warriors",
//     title: "Warriors",
//     genre: "Epic Fantasy / Action Adventure",
//     runtime: "52 minutes",
//     releaseDate: "January 20, 2025",
//     category: "Animated Epic",
//     thumbnail: "/path/to/warriors-thumbnail.jpg", // Update with actual path
//     url: "/stories/warriors",
//     description:
//       "An epic animated saga about a powerful clan that rises to become the strongest force on the planet through determination and unity.",
//     synopsis:
//       "Warriors presents an epic saga of the Ketu clan, a people who rise from the ashes of near-extinction to become the most formidable force on their world. This isn't just a story of physical strength, but of spiritual fortitude, community bonds, and the power of unified purpose in the face of seemingly impossible odds.",
//     storyArc:
//       "The Ketu people, once peaceful farmers, are forced to transform when their homeland is threatened by an alliance of aggressive neighboring clans. The story follows their gradual transformation from villagers to elite warriors, emphasizing that true strength comes from discipline, sacrifice, and mental fortitude.",
//     themes: [
//       "Transformation: From peaceful farmers to elite warriors",
//       "Unity: The power of community bonds and unified purpose",
//       "Protection: Fighting not for glory but to protect what you love",
//       "Leadership: The sacrifices required for true leadership",
//       "Spiritual Strength: Power that comes from connection to land and purpose",
//     ],
//     visualStyle:
//       "The animation style blends realistic character design with stylized action sequences. The color palette shifts from earth tones in peaceful moments to dynamic, high-contrast schemes during battles. The warriors' spiritual connection to their land is visualized through subtle animation effects.",
//     targetAudience:
//       "Appeals to fans of epic fantasy and action adventure, suitable for viewers 13 and above who appreciate complex world-building and philosophical themes about strength and leadership.",
//   },
// };

// const AnimationDescriptionPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { storyId } = useParams<{ storyId: string }>();

//   // Get the story data based on the URL parameter or default to brothers
//   const storyKey = storyId || "brothers";
//   const storyData = storiesData[storyKey];

//   // If story not found, show error or redirect
//   if (!storyData) {
//     return (
//       <div>
//         <NavBar />
//         <div
//           className="wrapper"
//           style={{ padding: "2rem 0", textAlign: "center" }}
//         >
//           <h1>Story Not Found</h1>
//           <p>The requested story could not be found.</p>
//           <button
//             onClick={() => navigate("/animation")}
//             style={{
//               padding: "10px 16px",
//               backgroundColor: "#071d6a",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             ← Back to Stories
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <NavBar />

//       {/* Header Section */}
//       <div className="software-main">
//         <div className="wrapper">
//           <div className="software-main-content">
//             <div style={{ margin: "1rem 0" }}>
//               <button
//                 onClick={() => navigate(-1)}
//                 style={{
//                   padding: "10px 16px",
//                   backgroundColor: "#071d6a",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 ← Back to Stories
//               </button>
//             </div>
//             <h1 className="software-header">{storyData.title}</h1>
//             <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
//               {storyData.genre} • {storyData.runtime} • {storyData.releaseDate}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Story Details */}
//       <div className="wrapper" style={{ padding: "2rem 0" }}>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 2fr",
//             gap: "2rem",
//             marginBottom: "3rem",
//           }}
//         >
//           <div>
//             <img
//               src={storyData.thumbnail}
//               alt={storyData.title}
//               style={{
//                 width: "100%",
//                 borderRadius: "10px",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//               }}
//             />
//             <div
//               style={{
//                 marginTop: "1rem",
//                 padding: "1rem",
//                 backgroundColor: "#f8f9fa",
//                 borderRadius: "8px",
//               }}
//             >
//               <h4 style={{ color: "#071d6a", marginBottom: "0.5rem" }}>
//                 Quick Info
//               </h4>
//               <p>
//                 <strong>Genre:</strong> {storyData.genre}
//               </p>
//               <p>
//                 <strong>Runtime:</strong> {storyData.runtime}
//               </p>
//               <p>
//                 <strong>Category:</strong> {storyData.category}
//               </p>
//               <p>
//                 <strong>Release:</strong> {storyData.releaseDate}
//               </p>
//             </div>
//           </div>

//           <div>
//             <h2 style={{ color: "#071d6a", marginBottom: "1rem" }}>Synopsis</h2>
//             <p
//               style={{
//                 fontSize: "1.1rem",
//                 lineHeight: "1.6",
//                 marginBottom: "2rem",
//               }}
//             >
//               {storyData.synopsis}
//             </p>

//             <h3 style={{ color: "#071d6a", marginBottom: "1rem" }}>
//               Story Arc
//             </h3>
//             <p style={{ lineHeight: "1.6", marginBottom: "2rem" }}>
//               {storyData.storyArc}
//             </p>
//           </div>
//         </div>

//         <div style={{ marginBottom: "3rem" }}>
//           <h3 style={{ color: "#071d6a", marginBottom: "1rem" }}>
//             Themes & Emotional Depth
//           </h3>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//               gap: "1rem",
//             }}
//           >
//             {storyData.themes.map((theme, index) => (
//               <div
//                 key={index}
//                 style={{
//                   padding: "1rem",
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "8px",
//                   borderLeft: "4px solid #071d6a",
//                 }}
//               >
//                 <p style={{ margin: 0, fontWeight: "500" }}>{theme}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div style={{ marginBottom: "3rem" }}>
//           <h3 style={{ color: "#071d6a", marginBottom: "1rem" }}>
//             Visual Style
//           </h3>
//           <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>
//             {storyData.visualStyle}
//           </p>
//         </div>

//         <div style={{ marginBottom: "3rem" }}>
//           <h3 style={{ color: "#071d6a", marginBottom: "1rem" }}>
//             Target Audience
//           </h3>
//           <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>
//             {storyData.targetAudience}
//           </p>
//         </div>

//         {/* Additional Info Section (if available) */}
//         {storyData.additionalInfo && (
//           <div style={{ marginBottom: "3rem" }}>
//             <h3 style={{ color: "#071d6a", marginBottom: "1rem" }}>
//               Additional Details
//             </h3>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//                 gap: "1rem",
//               }}
//             >
//               {Object.entries(storyData.additionalInfo).map(([key, value]) => (
//                 <div
//                   key={key}
//                   style={{
//                     padding: "1rem",
//                     backgroundColor: "#f8f9fa",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   <h5
//                     style={{
//                       color: "#071d6a",
//                       marginBottom: "0.5rem",
//                       textTransform: "capitalize",
//                     }}
//                   >
//                     {key.replace(/([A-Z])/g, " $1").trim()}
//                   </h5>
//                   <p style={{ margin: 0, fontSize: "0.9rem" }}>{value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Watch/Read Buttons */}
//         <div
//           style={{
//             textAlign: "center",
//             padding: "2rem",
//             backgroundColor: "#f8f9fa",
//             borderRadius: "10px",
//           }}
//         >
//           <h3 style={{ marginBottom: "1rem" }}>Experience {storyData.title}</h3>
//           <div
//             style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
//           >
//             <button
//               style={{
//                 padding: "12px 24px",
//                 backgroundColor: "#071d6a",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "6px",
//                 fontSize: "1rem",
//                 cursor: "pointer",
//               }}
//             >
//               Watch Animation
//             </button>
//             <button
//               style={{
//                 padding: "12px 24px",
//                 backgroundColor: "#fff",
//                 color: "#071d6a",
//                 border: "2px solid #071d6a",
//                 borderRadius: "6px",
//                 fontSize: "1rem",
//                 cursor: "pointer",
//               }}
//             >
//               Read Story
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnimationDescriptionPage;

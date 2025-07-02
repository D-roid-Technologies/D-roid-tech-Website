import { SkillAcquisitionTraining } from "./skill-acquisition-training";
import { FrontendTraining } from "./frontend-training";
export const TrainingDescriptionData = ({ program }: { program: string }) => {
  if (program === "frontend") {
    return <FrontendTraining/>
  } else if (program === "skill") {
    return <SkillAcquisitionTraining/>
  } else {
    return <p>No program data found.</p>;
  }
};

// import { Brothers, Cityboy, Resilience, Warriors } from "./AnimationDescriptions";

// export const AnimationDescriptionData = ({ story }: { story: string }) => {
//   if (story === "brothers") {
//     return <Brothers />;
//   } else if (story === "cityboy") {
//     return <Cityboy />;
//   } else if (story === "resilience") {
//     return <Resilience />;
//   } else if (story === "warriors") {
//     return <Warriors />;
//   } else {
//     return <p>No story data found.</p>;
//   }
// };
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


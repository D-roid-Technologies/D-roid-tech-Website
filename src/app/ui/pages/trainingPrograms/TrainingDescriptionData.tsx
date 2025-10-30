import { SkillAcquisitionTraining } from "./skill-acquisition-training";
import { FrontendTraining } from "./frontend-training";

interface TrainingDescriptionDataProps {
  program: string;
  onContactClick?: () => void;
}

export const TrainingDescriptionData = ({ program, onContactClick }: TrainingDescriptionDataProps) => {
  if (program === "frontend") {
    return <FrontendTraining onContactClick={onContactClick}/>
  } else if (program === "skill") {
    return <SkillAcquisitionTraining onContactClick={onContactClick}/>
  } else {
    return <p>No program data found.</p>;
  }
};


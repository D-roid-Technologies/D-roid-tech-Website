import { useSelector } from "react-redux";
import { selectCurrentPosition } from "../../../../redux/slices/ProgressionSlice";
import { UpgradeOpportunities } from "../UpgradeOpportunities";
import ProgressionHeader from "./ProgressHeader";

const Progression: React.FC = () => {
  const currentPosition = useSelector(selectCurrentPosition);

  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
  <ProgressionHeader />;

      {/* The rest of your previous Progression UI remains unchanged */}
      {/* You can paste the rest of your Progression.tsx content here unchanged */}
      <UpgradeOpportunities currentTier={currentPosition} />
    </div>
  );
};

export default Progression;

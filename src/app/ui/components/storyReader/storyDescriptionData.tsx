import BrothersStory from "./BrothersStory";
import CityBoysStory from "./CityBoysStory";
import WarriorsStory from "./WarriorsStory";
import ResilienceStory from "./ResilienceStory";
export const storyDescriptionData = ({ story }: { story: string }) => {
  if (story === "brothers") {
    return  <BrothersStory />;
  } else if (story === "Cityboy") {
    return <CityBoysStory />;
  } else if (story === "Resilience") {
    return <ResilienceStory />;
  } else if (story === "Warriors") {
    return <WarriorsStory />;
  } else {
    return <p>No story data found.</p>;
  }
};
import BrothersStory from "./BrothersStory";
import CityBoysStory from "./BrothersStory";
export const storyDescriptionData = ({ story }: { story: string }) => {
  if (story === "brothers") {
    return  <CityBoysStory />;
  } else if (story === "Cityboy") {
    return <CityBoysStory />;
  } else if (story === "Resilience") {
    return <CityBoysStory />;
  } else if (story === "Warriors") {
    return <CityBoysStory />;
  } else {
    return <p>No story data found.</p>;
  }
};
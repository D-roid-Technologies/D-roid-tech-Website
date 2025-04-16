import { Provider } from "react-redux";
import AppEntry from "./app/ui/AppEntry";
import { store } from "./app/redux/Store";
import DroidJournalPage from "./app/ui/pages/DroidJournal/DroidJournalPage";
import CareersPage from "./app/ui/pages/careers/CareersPage";
import SoftwareDevelopmentPage from "./app/ui/pages/softwareDevelopment/SoftwareDevelopmentPage";
import TrainingProgramsPage from "./app/ui/pages/trainingPrograms/TrainingProgramsPage";
import AnimationPage from "./app/ui/pages/animationPage/AnimationPage";
import ConsultingPage from "./app/ui/pages/consultingPage/ConsltingPage";

function App() {
  // The App.js file
  return (
    <Provider store={store}>
      {/* <AppEntry /> */}
      <ConsultingPage/>
    </Provider>
  );
}

export default App;

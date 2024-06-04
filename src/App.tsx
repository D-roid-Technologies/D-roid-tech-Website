import { Provider } from "react-redux";
import AppEntry from "./app/ui/AppEntry";
import { store } from "./app/redux/Store";

function App() {
  // The App.js file
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
}

export default App;

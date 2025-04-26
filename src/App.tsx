import { Provider, useSelector } from "react-redux";
import AppEntry from "./app/ui/AppEntry";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/redux/Store";
import { RootState } from "./app/redux/Store";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function AppContent() {
  const user: any = useSelector((state: RootState) => state.user);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back Online 🎉', {
        style: {
          background: '#4BB543',
          color: '#fff',
        },
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('No Internet Connection 🚫', {
        style: {
          background: '#ff4d4f',
          color: '#fff',
        },
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
    } else {
      console.log("No user logged in");
    }
  }, [user]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppEntry />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;

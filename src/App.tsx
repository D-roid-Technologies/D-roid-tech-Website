import { Provider, useSelector } from "react-redux";
import AppEntry from "./app/ui/AppEntry";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/redux/Store";
import { RootState } from "./app/redux/Store";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserType } from "./app/utils/Types";
import { BrowserRouter } from 'react-router-dom';
import { SiR } from "react-icons/si";
import ScrollToTop from "./app/ui/components/ScrollToTop/ScrollToTop";

function AppContent() {
  const user: UserType = useSelector((state: RootState) => state.user);
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
    if (user.isLoggedIn === true) {
      console.log("User exists");
      // console.log("User exists", user);
    } else {
      console.log("No user exists");
    }
  }, [user]);

  return (
    <>
      {!isOnline && (
        <div style={{
          background: '#ff4d4f',
          color: '#fff',
          textAlign: 'center',
          padding: '10px',
          fontWeight: '500'
        }}>
          🔌 You're offline. Some features may not work.
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
      <ScrollToTop />
        <AppEntry />
      </BrowserRouter>
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

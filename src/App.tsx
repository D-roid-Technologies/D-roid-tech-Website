import { Provider, useSelector } from "react-redux";
import AppEntry from "./app/ui/AppEntry";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/redux/Store";
import { RootState } from "./app/redux/Store";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserType } from "./app/utils/Types";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./app/ui/components/ScrollToTop/ScrollToTop";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { WelcomeModal } from "./app/ui/components/PromoModule/WelcomeModal";

function AppContent() {
  const user: UserType = useSelector((state: RootState) => state.user);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [authReady, setAuthReady] = useState<boolean>(false); // <-- new state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setAuthReady(true); // <-- Firebase is ready (even if user is null)
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Back Online 🎉", {
        style: { background: "#4BB543", color: "#fff" },
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("No Internet Connection 🚫", {
        style: { background: "#ff4d4f", color: "#fff" },
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
    if (user?.isLoggedIn) {
      console.log("User exists");
    } else {
      console.log("No user exists");
    }
  }, [user]);

  if (!authReady) {
    // You can return a loading spinner here
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  return (
    <>
      {!isOnline && (
        <div
          style={{
            background: "#ff4d4f",
            color: "#fff",
            textAlign: "center",
            padding: "10px",
            fontWeight: "500",
          }}
        >
          🔌 You're offline. Some features may not work.
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <ScrollToTop />
        <AppEntry />
        {!user?.isLoggedIn && <WelcomeModal />}
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

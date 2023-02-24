import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Flyer } from "./pages/Dashboard/Flyer";
import { Flyers } from "./pages/Dashboard/Flyers";
import { CreateFlyer } from "./components/Dashboard/CreateFlyer";
import { Login } from "./pages/Dashboard/Login";
import { LandingPage } from "./pages/LandingPage";

import { EditFlyer } from "./components/Dashboard/EditFlyer";
import "./styles/global.scss";

function App() {
  const isLoggedIn = useAuth();
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/dashboard/flyers"
            element={isLoggedIn ? <Flyers /> : <Login />}
          />
          <Route
            path="/dashboard/flyers/create"
            element={isLoggedIn ? <CreateFlyer /> : <Flyers />}
          />
          <Route
            path="/dashboard/flyers/:id"
            element={isLoggedIn ? <Flyer /> : <Login />}
          />
          <Route
            path="/dashboard/flyers/:id/edit"
            element={isLoggedIn ? <EditFlyer /> : <Login />}
          />
          <Route
            path="/landingpage/:id"
            element={<LandingPage />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

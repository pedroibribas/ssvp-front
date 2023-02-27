import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { Flyer } from "./pages/Dashboard/Flyer";
import { Flyers } from "./pages/Dashboard/Flyers";
import { CreateFlyer } from "./components/Dashboard/CreateFlyer";
import { Login } from "./pages/Dashboard/Login";
import { LandingPage } from "./pages/LandingPage";
import { EditFlyer } from "./components/Dashboard/EditFlyer";
import { RequiredAuth } from "./components/Dashboard/RequiredAuth";

import "./styles/global.scss";

const NavigateToLandingPage = () => {
  const params = useParams();
  return <Navigate to={`/landingpage/${params.id}`} replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/landingpage/:id"
            element={<LandingPage />}
          />
          <Route
            path="/flyer/:id"
            element={<NavigateToLandingPage />}
          />
          <Route
            path="/dashboard/login"
            element={<Login />}
          />
          <Route
            path="/dashboard"
            element={<Navigate to={"/dashboard/flyers"} replace />}
          />
          <Route
            path="/dashboard/flyers"
            element={
              <RequiredAuth>
                <Flyers />
              </RequiredAuth>
            }
          />
          <Route
            path="/dashboard/flyers/create"
            element={
              <RequiredAuth>
                <CreateFlyer />
              </RequiredAuth>
            }
          />
          <Route
            path="/dashboard/flyers/:id"
            element={
              <RequiredAuth>
                <Flyer />
              </RequiredAuth>
            }
          />
          <Route
            path="/dashboard/flyers/:id/edit"
            element={
              <RequiredAuth>
                <EditFlyer />
              </RequiredAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

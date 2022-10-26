import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { Flyer } from "./pages/Flyer";
import { List } from "./pages/List";
import { Login } from "./pages/Login";
import "./styles/global.scss";

function App() {
  const isLoggedIn = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
          <Route path="/list/:id" element={isLoggedIn ? <List /> : <Login />} />
          <Route path="/flyer/:id" element={<Flyer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 

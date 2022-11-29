import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { Dashboard } from "./pages/Dashboard";
import { Flyer } from "./pages/Flyer";
import { Home } from "./pages/Home";
import { List } from "./pages/List";
import { Login } from "./pages/Login";

function App() {
  const isLoggedIn = useAuth();

  return (
    <AuthProvider>
      <ModalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
            <Route path="/list/:id" element={isLoggedIn ? <List /> : <Login />} />
            <Route path="/flyer/:id" element={<Flyer />} />
          </Routes>
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;

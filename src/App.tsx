import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Flyer } from "./pages/Flyer";
import "./styles/global.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/flyer/:id" element={<Flyer />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

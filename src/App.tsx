import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Flyer } from "./pages/Flyer";
import { List } from "./pages/List";
import "./styles/global.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flyer/:id" element={<Flyer />} />
        <Route path="/list/:id" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Examples from "./components/Examples";
import Info from "./components/Info";

const App = () => {
  return (
    <div className="App">
      {/* Your existing code */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/info" element={<Info />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;

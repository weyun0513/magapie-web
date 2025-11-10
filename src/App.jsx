
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Book from "./components/Book";
import Program from "./components/Program";
import Activity from "./components/Activity";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
           <Route path="/book" element={<Book />} />
            <Route path="/programs" element={<Program />} />
            <Route path="/activity" element={<Activity />} />

        {/* 其他頁面 */}
      </Routes>
    </Router>
  );
}

export default App;
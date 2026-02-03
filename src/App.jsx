import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Book from "./components/Book";
import Program from "./components/Program";
import Activity from "./components/Activity";

function App() {
  return (
    
        <HashRouter>
 
      <Routes>
        <Route path="/" element={<Home />} />
           <Route path="/book" element={<Book />} />
            <Route path="/programs" element={<Program />} />
            <Route path="/PastActivities" element={<Activity />} />
            {/* <Route path="/activity/PastActivities" element={<Activity />} /> */}


        {/* 其他頁面 */}
      </Routes>
    </HashRouter>
 
  );
}

export default App;
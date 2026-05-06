import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Book from "./components/Book";
import Program from "./components/Program";
import Activity from "./components/Activity";
import PhotoGallery from "./components/PhotoGallery";
import AdminPage from "./components/AdminPage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (

    <HashRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/programs" element={<Program />} />
        <Route path="/activity/UpcomingActivities" element={<Activity />} />
        <Route path="/activity/PastActivities" element={<Activity />} />
        <Route path="/ActivityGallery" element={<PhotoGallery />} />
        <Route path="/photoGallery" element={<PhotoGallery />} />

      <Route path="/adminPage" element={
            <PrivateRoute>
              <AdminPage /> 
            </PrivateRoute>
          } />
        <Route path="/login" element={<Login />} />


        {/* 其他頁面 */}
      </Routes>
    </HashRouter>

  );
}

export default App;
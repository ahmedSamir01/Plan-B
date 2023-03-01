import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            index
            element={<h1 className="text-center mt-4">Welcome!</h1>}
          />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetails />} />

          <Route
            path="*"
            element={<h2 className="text-center mt-4">Not found!</h2>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

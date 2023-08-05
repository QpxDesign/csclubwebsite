import "./App.css";
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPost";
import SignInWithGoogle from "./pages/SignInWithGoogle";
import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import React from "react";
import Competition from "./pages/Competition";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage defaultViewMode={"About the Club"} />}
        />{" "}
        <Route
          path="/cool-stuff"
          element={<HomePage defaultViewMode={"Cool Stuff"} />}
        />
        <Route
          path="/deploy"
          element={<HomePage defaultViewMode={"Deploy"} />}
        />
        <Route
          path="/contact"
          element={<HomePage defaultViewMode={"Contact"} />}
        />
        <Route path="/blog/post/:id" element={<BlogPost />} />
        <Route path="/comp" element={<Competition />} />
      </Routes>
    </Router>
  );
}

export default App;

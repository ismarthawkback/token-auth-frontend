import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Market from "./pages/Market";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/market"
          element={
            <MainLayout>
              <Market />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

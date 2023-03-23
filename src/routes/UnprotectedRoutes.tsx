import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "~/common/components/Auth";
import LoginPage from "~/pages/LoginPage";
import Register from "~/pages/Register";

export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<Register />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "~/common/components/NotFound";
import Welcome from "~/pages/Welcome";

export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="welcome" element={<Welcome />}></Route>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

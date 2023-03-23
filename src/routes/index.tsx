import LoaderFullScreen from "~/common/components/LoaderFullScreen";
import { useAuthContext } from "~/contexts/AuthContext/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import UnprotectedRoutes from "./UnprotectedRoutes";
import useAppPrefetch from "../hooks/useAppPrefetch";

export default function AppRoutes() {
  const { isLoading, isLoggedIn } = useAuthContext();
  useAppPrefetch();

  if (isLoading) return <LoaderFullScreen />;

  return isLoggedIn ? <ProtectedRoutes /> : <UnprotectedRoutes />;
}

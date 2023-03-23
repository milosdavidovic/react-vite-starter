import Chassis from "./common/components/Chassis/Chassis";
import AppProvider from "./providers/AppProvider";
import AppRoutes from "./routes";
import "./i18n/i18n";

export default function App() {
  return (
    <AppProvider>
      <Chassis>
        <AppRoutes />
      </Chassis>
    </AppProvider>
  );
}

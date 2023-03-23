import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { FCC } from "~/@types/general";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GeneralError from "~/common/components/GeneralError";
import VLThemeProvider from "./CustomThemeProvider";
import { AuthContextProvider } from "~/contexts/AuthContext/AuthContext";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { queryClient } from "~/libs/reactQuery/reactQuery";

const AppProvider: FCC = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary FallbackComponent={GeneralError}>
        <VLThemeProvider>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <SnackbarProvider
                maxSnack={3}
                autoHideDuration={3000}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
              >
                <Router>
                  <AuthContextProvider>{children}</AuthContextProvider>
                </Router>
              </SnackbarProvider>
            </QueryClientProvider>
          </LocalizationProvider>
        </VLThemeProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AppProvider;

import React, { PropsWithChildren, useContext, useMemo } from "react";
import { useAuth } from "~/contexts/AuthContext/useAuth";

const AuthContext = React.createContext<ReturnType<typeof useAuth> | null>(null);

/**
 * Make sure This provider is rendered under Router from react-router-dom as underlying
 * hook uses routing features
 */
const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  const value = useMemo(() => auth, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw Error("useAuthContext rendered outside AuthContextProvider");
  }

  return value;
};

export { AuthContext, useAuthContext, AuthContextProvider };

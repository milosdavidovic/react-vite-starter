const authDataIdentifier = "vaultlink_react_auth_data";

type AuthData = {
  token: string;
  refreshToken: string;
  tokenExpiresAt: number;
};
export const authStorage = {
  getAuthData: (): AuthData | null => {
    const data = window.localStorage.getItem(authDataIdentifier);

    return data ? JSON.parse(data) : null;
  },
  setAuthData: (data: AuthData): void => {
    window.localStorage.setItem(authDataIdentifier, JSON.stringify(data));
  },
  clearAuthData: (): void => {
    window.localStorage.removeItem(authDataIdentifier);
  },
};

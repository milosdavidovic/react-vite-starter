import axios from "axios";
import { APP_CONFIG } from "~/utils/config";

export const refreshAuthToken = (refreshToken: string) => {
  const params = new URLSearchParams();

  params.append("grant_type", "refresh_token");
  params.append("client_id", APP_CONFIG.COGNITO_CLIENT_ID);
  params.append("refresh_token", refreshToken);

  return axios.post(`${APP_CONFIG.COGNITO_DOMAIN}/oauth2/token`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

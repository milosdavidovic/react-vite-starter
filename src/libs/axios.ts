import { APP_CONFIG } from "./../utils/config";
import Axios, { AxiosRequestConfig } from "axios";
import { queryClient } from "./reactQuery/reactQuery";
import { authStorage } from "~/utils/auth/authStorage";

function authRequestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  if (!config.headers) {
    throw TypeError("config headers are missing");
  }

  const authData = authStorage.getAuthData();

  if (authData?.token) {
    config.headers.authorization = `Bearer ${authData.token}`;
  }
  config.headers.Accept = "application/json";

  return config;
}

export const axios = Axios.create({
  baseURL: APP_CONFIG.BASE_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error.response?.status) {
      queryClient.clear();
      authStorage.clearAuthData();

      return Promise.reject({ message: "Please re-authenticate." });
    }
    // TODO: Fire notification with -> error.response?.data?.message || error.message;
    // eslint-disable-next-line no-console
    console.log("I errored!", error);
    return Promise.reject(error);
  },
);

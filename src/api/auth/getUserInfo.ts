import { UserInfo } from "./types";
import { QueryConfig } from "../../libs/reactQuery/reactQuery";
import { axios } from "~/libs/axios";
import { QueryKey, useQuery } from "@tanstack/react-query";

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await axios.get("auth/info");
  return response.data;
};

type Options = {
  config?: QueryConfig<typeof getUserInfo>;
};

export const useGetUserInfo = ({ config }: Options = {}) => {
  return useQuery(["userInfo"] as QueryKey, getUserInfo, {
    ...config,
    refetchOnWindowFocus: false,
  });
};

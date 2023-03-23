import { QueryConfig } from "../../libs/reactQuery/reactQuery";
import { axios } from "~/libs/axios";
import { QueryKey, useQuery } from "@tanstack/react-query";

export interface Country {
  emoji: string;
  iso2: string;
  iso3: string;
  name: string;
  numeric_code: string;
  phone_code: string;
  states: Array<State>;
}

export interface State {
  id: string;
  name: string;
}

export const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get("data/countries");
  return response.data;
};

type Options = {
  config?: QueryConfig<typeof getCountries>;
};

export const useGetCountries = ({ config }: Options = {}) => {
  return useQuery(["countries"] as QueryKey, getCountries, {
    ...config,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

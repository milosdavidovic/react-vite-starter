import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "../../libs/reactQuery/reactQuery";
import { axios } from "~/libs/axios";
import { RegisterDto } from "./types";

export const register = async (data: RegisterDto): Promise<RegisterDto> => {
  const response = await axios.post<RegisterDto>("auth/register", data).then((response) => response.data);
  return response;
};

type Config = {
  config?: MutationConfig<typeof register>;
};

export const useRegister = ({ config }: Config = {}) => {
  const result = useMutation(register, {
    ...config,
  });

  return result;
};

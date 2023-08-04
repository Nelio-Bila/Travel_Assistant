import {api} from "@/config/api";
import { AxiosResponse } from "axios";

interface SignUpResponse {
  message: string;
  user: {
    email: string;
  };
}

interface User {
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const signup = async ({
  email,
  password,
}: User): Promise<SignUpResponse | unknown> => {
  try {
    const { data }: AxiosResponse<SignUpResponse> = await api.post("/auth/register", {
      email,
      password,
    });
    return data;
  } catch (error) {
    return error;
  }
};


export async function login({ email, password }: LoginProps) {
  const {
    data: { token, user },
  } = await api.post("/auth/login", { email, password });

  return {
    token,
    user,
  };
}

export async function recoverUserInformation(token: string){
  const {
    data: { user },
  } = await api.post("/auth/user", { token});

  return {
    user,
  };
}


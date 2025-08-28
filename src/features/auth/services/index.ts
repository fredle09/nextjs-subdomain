import { api } from "@/lib/axios";

export interface ILoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
  token: string;
  refreshToken?: string;
}

export interface IGoogleLoginResponse extends ILoginResponse {}

export const authService = {
  login: async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  googleLogin: async (): Promise<IGoogleLoginResponse> => {
    const response = await api.post("/auth/google");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  refreshToken: async (refreshToken: string): Promise<ILoginResponse> => {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  },
};

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

export const authService = {
  login: async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
    return api.post("/auth/login", credentials);
  },

  googleLogin: async (): Promise<ILoginResponse> => {
    return api.post("/auth/google");
  },

  logout: async (): Promise<void> => {
    return api.post("/auth/logout");
  },

  refreshToken: async (refreshToken: string): Promise<ILoginResponse> => {
    return api.post("/auth/refresh", { refreshToken });
  },
};

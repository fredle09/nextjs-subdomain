import Axios from "axios";
import queryString from "query-string";

export const api = Axios.create({
  baseURL: `${(process.env.NEXT_PUBLIC_URL_API || "").replace(/\/+$/, "")}/api`,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async function (config) {
    config.paramsSerializer = (params) => {
      return queryString.stringify(params, {
        encode: false,
        arrayFormat: "bracket",
      });
    };

    if (config.headers["Content-Type"] === "multipart/form-data") {
      return config;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }

    return response;
  },
  async function (error) {
    return Promise.reject(error?.response?.data || error.message || error);
  }
);

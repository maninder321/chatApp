import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
  timeout: 10000,
});

interface IAxiosAuthPayload {
  token: string;
}

const setAxiosAuth = ({ token }: IAxiosAuthPayload): void => {
  axiosAuth.interceptors.request.use((config) => {
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  });
};

export { axiosAuth, setAxiosAuth };

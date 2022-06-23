import axios from "axios";

interface UrlBackend {
  urlBackendServer: string;
}

const axiosInstance = axios.create({
  withCredentials: true,
});

// * считываем baseURL из config.json, который расположен в директории public
axiosInstance.interceptors.request.use(async (config) => {
  await axios.get<UrlBackend>('config.json').then((res) => {
    // console.log(res.data.urlBackendServer);
    config.baseURL = res.data.urlBackendServer;
  });
  return config;
});

export default axiosInstance;

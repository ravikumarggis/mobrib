import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import toast from "react-hot-toast";

// API URLs



export const url: string = "https://api.thesoulty.com/api/v1"; // new staging;
// export const url: string = "http://192.168.1.24:5013/api/v1"; // tigerrrrr;



export const zuelBaseURl = `https://zuel.soluty.com/api/v1`;

export const api: AxiosInstance = axios.create({
  baseURL: url,

  // headers: {
  //   "Content-Type": "application/json",
  // }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {

    // const token = localStorage.getItem("token");
    const token = sessionStorage.getItem("token");

    if (token) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("token", token);
        config.headers.set("web");
      } else {
        config.headers = new AxiosHeaders({
          token: token,
          deviceType: "web",
        });
      }
    }
  } catch (error) {
    console.error("Error retrieving access token:", error);
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error?.response?.data?.responseCode == 440) {
      // localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      toast.error(error?.response?.data?.responseMessage);
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

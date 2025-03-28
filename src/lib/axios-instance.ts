/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, {type AxiosInstance as AxiosInstanceType} from "axios";

export interface CustomError extends Error {
  errorCode?: string;
}

// Create an Axios instance with custom configurations.
const axiosInstance: AxiosInstanceType = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: true, // Include credentials in requests.
  timeout: 1000, // Timeout duration in milliseconds.
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up a response interceptor to handle custom error logic and redirect on Unauthorized errors.
axiosInstance.interceptors.response.use(
  response => {
    return response; // Return the response if successful.
  },
  async error => {
    const {data, status} = error.response;

    // Redirect to login or home page if Unauthorized (401) error occurs.
    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }

    // Create a custom error with additional errorCode if available.
    const customError: CustomError = {
      ...error,
      errorCode: data?.errorCode ?? "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);

export default axiosInstance;

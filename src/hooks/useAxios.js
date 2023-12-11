import axios from "axios";
import { useContext, useState } from "react";
import authContext from "../contexts/AuthContext";

const useAxios = () => {
  const { accessToken } = useContext(authContext);

  const axiosInstance = axios.create({
    baseURL: "https://fdcl5f-8000.csb.app/api", // Replace with your actual API URL
  });

  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  const get = async (url, config = {}) => {
    const response = await axiosInstance.get(url, config);
    return response.data;
  };

  const post = async (url, data, config = {}) => {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  };

  const put = async (url, data, config = {}) => {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  };

  const del = async (url, config = {}) => {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  };

  return { get, post, put, del }; // alias delete to avoid conflict with reserved keyword
};

export default useAxios;

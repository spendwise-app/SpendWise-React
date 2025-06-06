import axios from "axios";
import { store } from "../store/zustand";


const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

// baseURL: "https://spendwise-web.onrender.com/api",


API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const logout = store.getState().logoutUser;
      logout("Oops! Your session timed out. Please sign in again."); 
    }
    return Promise.reject(error);
  }
);

export default API;
import { create } from "zustand";
import API from "../config/axios";
import { toast } from "react-toastify";

const useStore = create((set, get) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const balanceAmount = localStorage.getItem("balance");
  return {
    user: storedUser || null,
    balance: balanceAmount || null,

    setUser: (userData) => {
      set({ user: userData });
      localStorage.setItem("user", JSON.stringify(userData));
    },

    setBalance : (data) => {
      set({ balance: data });
      localStorage.setItem("balance", Number(data))
    },

    logoutUser: (msg) => {
      API.post("/auth/logout")
        .then((res) => {
          toast.success(msg || res.data.message);
          localStorage.clear();
          set({ user: null });
        })
        .catch((err) => toast.error(err));
    },

    updateUser: async (data) => {
      try{
        await API.post('/user', data).then((res)=>{
          const { setUser} = get();
          setUser(res.data.user);
          toast.success(res.data.message || "Profile updated successfully.")
        })
      } catch(err){
        toast.error(err.message)
      }
    }
  };
});

export default useStore;

export const store = useStore;

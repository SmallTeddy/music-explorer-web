import { Local } from "@/cache";
import useUserStore from "../../store/modules/user";

const userStore = useUserStore();

export const logout = () => {
  userStore.LOGOUT();
  setTimeout(() => {
    window.location.href = "/login";
  }, 500);
};

export const setToken = (token: string) => {
  Local.set(token, token);
};

export const getToken = () => {
  const token = Local.get("token");
  return token;
};

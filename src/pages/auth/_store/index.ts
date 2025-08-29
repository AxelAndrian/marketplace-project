import { defineStore } from "pinia";
import Cookies from "js-cookie";
import type { LoginForm } from "../_types/login";
import api from "@/lib/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: Cookies.get("token") || "",
  }),
  actions: {
    async login(payload: LoginForm) {
      const result = await api.post<{ token: string }>("auth/login", payload);

      if (result.status !== 201) {
        throw new Error("Login failed");
      }

      this.token = result.data.token;
      Cookies.set("token", this.token, { expires: 7 });
    },
    logout() {
      this.token = "";
      Cookies.remove("token");
    },
  },
});

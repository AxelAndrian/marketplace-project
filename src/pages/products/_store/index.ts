import { defineStore } from "pinia";
import api from "@/lib/axios";
import type { Product } from "../_types";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [] as Array<Product>,
    product: {} as Product,
  }),
  actions: {
    async fetchProducts() {
      const result = await api.get<Array<Product>>("products");

      if (result.status !== 200) {
        throw new Error("Login failed");
      }

      this.products = result.data;
      localStorage.setItem(
        "productsLength",
        JSON.stringify(this.products.length)
      );
    },
    async fetchProduct(id: string) {
      const result = await api.get<Product>(`products/${id}`);

      if (!result) {
        throw new Error("Fetch product failed");
      }

      this.product = result.data;
    },
    async createProduct(payload: Product) {
      const result = await api.post<Product>("products", payload);

      if (result.status !== 201) {
        throw new Error("Create product failed");
      }
    },
  },
});

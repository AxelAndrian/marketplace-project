import { h } from "vue";
import { ChevronsUpDown } from "lucide-vue-next";
import type { ColumnDef } from "@tanstack/vue-table";

import type { Product } from "../_types";
import { Button } from "@/components/ui/button";
import ButtonActions from "./button-actions.vue";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Title", h(ChevronsUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h(
        "div",
        {
          class: "lowercase truncate max-w-xs", // add truncate and max width for ellipsis
          style: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        },
        row.getValue("title")
      ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) =>
      h(
        "div",
        {
          class: "lowercase truncate max-w-xs", // add truncate and max width for ellipsis
          style: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        },
        row.getValue("description")
      ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return h("div", { class: "font-medium" }, formatted);
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const url = row.getValue("image");
      return h("img", {
        src: url,
        alt: "Product Image",
        class: "h-15 w-15 object-contain",
      });
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return h(ButtonActions, {
        data: row.original,
      });
    },
  },
];

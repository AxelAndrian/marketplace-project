import * as z from "zod";

import type { productSchema } from "../_interfaces";

export type Product = z.infer<typeof productSchema>;

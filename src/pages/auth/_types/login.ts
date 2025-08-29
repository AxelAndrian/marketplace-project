import * as z from 'zod';
import type { loginSchema } from '../_interfaces/login';

export type LoginForm = z.infer<typeof loginSchema>;

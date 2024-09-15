import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
    username: z.string().min(2, "Username is too short").max(50, "Username is too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})
import z from "zod"

export const SignInSchema = z.object({
    email: z.string().email("Invalid email address"),
    Password: z.string().min(6, "Password must be at least 6 characters long"),
})
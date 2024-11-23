import z from "zod"

export const SignupSchema = z.object({
    Name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    Password: z.string().min(6, "Password must be at least 6 characters long"),
});

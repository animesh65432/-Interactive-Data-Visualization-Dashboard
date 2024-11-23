import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupSchema } from "../schema"
import { useCreateUser } from "../hooks"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type SignupFormData = z.infer<typeof SignupSchema>;

const Signup: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
    });
    const { createUser, flg, errorMessage } = useCreateUser()
    const { toast } = useToast()
    const router = useRouter()

    const onSubmit = async (data: SignupFormData) => {
        try {
            await createUser(data)
            if (!flg) {
                toast({
                    title: "Sucessfully create User",
                    description: "Create The User"
                })

            }
            else {

                toast({
                    title: errorMessage
                })
            }
        } catch (error) {

        }

    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Create an Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                {...register("Name")}
                                className={errors.Name ? "border-red-500" : ""}
                            />
                            {errors.Name && (
                                <p className="text-sm text-red-500 mt-1">{errors.Name.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("Password")}
                                className={errors.Password ? "border-red-500" : ""}
                            />
                            {errors.Password && (
                                <p className="text-sm text-red-500 mt-1">{errors.Password.message}</p>
                            )}
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-sm text-center">
                    Already have an account? <a href="/auth/signin" className="text-blue-500">Sign In</a>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;

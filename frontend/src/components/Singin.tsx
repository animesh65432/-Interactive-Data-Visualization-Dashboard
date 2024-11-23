import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInSchema } from "../schema"
import { useLoginhook } from "../hooks"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


type SignInFormData = z.infer<typeof SignInSchema>;

const Signin: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(SignInSchema),
    });

    const { toast } = useToast()
    const router = useRouter()

    const { loginfunc, flg, errormessage } = useLoginhook()

    const onSubmit = async (data: SignInFormData) => {
        try {
            await loginfunc(data)
            if (!flg) {
                toast({
                    title: "Sucessfully log in the user",

                })
                router.push("/")
            }
            else {
                toast({
                    title: errormessage
                })
            }
        } catch (error) {
            toast({
                title: errormessage
            })
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
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-sm text-center">
                    Already have an account? <a href="/auth/signup" className="text-blue-500">Sign Up</a>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signin

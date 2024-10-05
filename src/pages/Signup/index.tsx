import React , { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logos/logo_square_default.svg";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import useAuth from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SignupRequest, SignupResponse } from "@/types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AuthApi } from "@/api";
 
const formSchema = z.object({
    name: z.string({
        message: "The name can not be empty",
    }),
    email: z.string().email({
        message: "Invalid email format."
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const Signup: React.FC = () => {
    const { isAuthenticated, update, setUpdate } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleLanding = () => {
        navigate("/landing");
    };
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })
        
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const payload: SignupRequest = {
                name: data.name,
                email: data.email,
                password: data.password
            };
            setUpdate(true);

            // Submit the response
            const submitResponse: SignupResponse = await AuthApi.register(payload);
            console.log("Signup response:", submitResponse);
            if (submitResponse.userId) {
                toast.success("Signup successful.");
                if (submitResponse.userId) {
                    // Go to the KYC page with ID userId
                    navigate(`/kyc/${submitResponse.userId}`);
                } 
            }
        } catch (error) {
            console.error("Submit error:", error);
            const err = error as AxiosError;
            toast.error((err.response?.data as { message: string })?.message || 'Server is unreachable. Please try again later.');
        } finally {
            setUpdate(false);
        }
    }
    
    return (
        <main className="flex flex-row w-[100vw] min-h-screen justify-center items-center bg-gradient-to-tr from-primary-default/[0.4] to-white">
            <div className="flex flex-col w-full gap-3 px-10">
                <img src={logo} alt="logo" onClick={handleLanding} className="absolute top-10 left-10 z-20 h-12 transition-transform duration-300 transform hover:scale-105" />
                <p className="font-figtree text-5xl font-semibold">Join TerraFarm!</p>
                <p className="font-figtree text-lg font-normal mb-4">Register to create your account</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type="name" className="h-12 rounded-xl" placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type="email" className="h-12 rounded-xl" placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type="password" className="h-12 rounded-xl" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full py-2 mt-8 text-lg bg-primary-default text-white rounded-full hover:bg-color-primary-default transition-transform duration-300 transform hover:scale-105" disabled={update}>
                            {update ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging In
                                </>
                            ) : (
                                'Signup'
                            )}
                        </Button>
                    </form>
                    </Form>
                <div className="flex flex-row gap-1 justify-center">
                    <p className="font-semibold">Already have an account?</p>
                    <a className="font-bold text-primary-default" href="/login">Login</a>
                </div>
            </div>
        </main>
    );
};

export default Signup;
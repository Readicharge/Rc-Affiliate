"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

export default function SignUpPage() {
    const router = useRouter();


    const onSignUp = async (user: any) => {
        console.log("user", typeof (user))
        const idata = {
            readicharge_Core_id: `${user.dropdown}-${user.email}`,
            userName: user.username,
            email: user.email,
            password: user.password,
            userType: user.dropdown
        }
        try {
            console.log("idata", idata)
            const resposne = await axios.post("/api/auth/signup", idata);
            console.log(resposne.data);
            router.push("/auth/signin")
        }
        catch (error: any) {
            console.log(error)
            toast({
                title: "Account Creation failed",
                description: "Please Check all fields correctly and select a user type.",
            });
        }
    }


    return (
        <div className="relative h-screen items-center justify-between  flex flex-row"  >
            <div style={{ position: 'fixed', top: 0, left: 0, width: "100%", height: "100%", backgroundImage: `url('https://readicharge.com/wp-content/uploads/2023/03/banner3.jpg')`, backgroundSize: 'cover', backgroundPosition: 'cover', backgroundBlendMode: 'hard-light', filter: 'blur(30px)', zIndex: -1 }}> </div>
            <div className="h-full bg-[#06061e] bg-opacity-80 w-[30%]" style={{
                boxShadow: "0 0 40px #96d232",
                borderTopRightRadius: 53,
                borderBottomRightRadius: 53,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",

            }}>
                <Card className="w-[30vw] bg-transparent border-none">
                    <CardHeader className='justify-center items-center'>
                        <CardTitle className='text-4xl'> Create an account</CardTitle>
                        <CardDescription className='text-md'>Create an account with ReadiCharge</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4  items-center">
                        <InputForm submit={onSignUp} />
                    </CardContent>
                    <CardFooter className="flex flex-col   items-center">
                        <Link href="/signin" className="text-sm text-underline">Already have an account?</Link>
                    </CardFooter>

                </Card>
            </div>
            <div className="w-full"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Image height={320} width={350} src={"https://readicharge.com/wp-content/uploads/2022/02/logo.png"} alt="ReadiCharge Logo" />
            </div>

        </div>
    )
}




// The Registration Form for the 
// 1. Indpendent Affliliate 
// 2. SUb Affiliate
// 3. Company for Installer 





const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid Email"
    }),
    password: z.string().min(8, {
        message: " Password should be atleast 8 characters."
    }),
    dropdown: z.string()
})

function InputForm({ submit }: any) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            dropdown: "", // Initialize dropdown value
        },
    });



    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (form.formState.isValid) {
            console.log("Form Is Submitted and the data received is " + JSON.stringify(data));
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            });
            await submit(data);
        } else {
            console.log("Here")
            // Form is not valid, display an error message or handle it accordingly
            toast({
                title: "Form submission failed",
                description: "Please fill in all fields correctly and select a user type.",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Yash Singh" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Yash@ReadiCharge.com" {...field} type="email" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Secure Password" {...field} type="password" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dropdown"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Type</FormLabel>
                            <FormControl className="ml-2">
                                <DropDownOption field={field} />
                            </FormControl >
                        </FormItem>
                    )}
                />



                <Button type="submit" style={{
                    backgroundColor: "#96d232"
                }}>Create Account</Button>
            </form>
        </Form>
    )
}





// The DropDown Section for the User Type 
function DropDownOption({ field }: { field: any }) {
    const [position, setPosition] = React.useState("");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{position ? position : 'Select'}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select your role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={(value) => {
                    setPosition(value);
                    field.onChange(value);
                }}>
                    {/* <DropdownMenuRadioItem value="companyInstaller">Company Installer</DropdownMenuRadioItem> */}
                    <DropdownMenuRadioItem value="affiliateViaNetwork">Affiliate via Network</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="readichargeSalesPerson">ReadiCharge Sales Person</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="independentAffiliate">Independent Affiliate</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="managerAffilaite">Affiliate Manager</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
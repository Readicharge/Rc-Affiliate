"use client"


import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import axios from "axios";


export default function UserAuthForm() {

    const router = useRouter();

    const onSignIn = async (user: { email: any; password: any; dropdown: any; }) => {
        console.log("user",typeof(user))
        const idata = {
            email:user.email,
            password:user.password,
            userType:user.dropdown
        }
        try{
            console.log("idata",idata)
            const resposne = await axios.post("/api/auth/login",idata);
            console.log(resposne.data);
            router.push(`/dashboard/`)
        }
        catch(error:any)
        {
            console.log(error)
            toast({
                title: "Sign In failed",
                description: "Please Check all fields correctly and select a user type.",
            });
        }
    }

    return (
        <div className="flex flex-col items-center justify-center  py-2 gap-y-4 bg-transparent" >
            <Card className="w-[350px] bg-[#060e37] bg-opacity-20">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Sign In with ReadiCharge</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-2">
                        <InputForm  submit={onSignIn}/>
                        <Link href="/auth/signup">Don't have an account?</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}




// The Registration Form for the 
// 1. Indpendent Affliliate 
// 2. SUb Affiliate
// 3. Company for Installer 





const FormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid Email"
    }),
    password: z.string().min(8, {
        message: " Password should be atleast 8 characters."
    }),
    dropdown: z.string()
})

function InputForm({submit}:any) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
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



                <Button type="submit" style={{backgroundColor:"#96d232"}}>Submit</Button>
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
                <DropdownMenuLabel>Select your Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={(value) => {
                    setPosition(value);
                    field.onChange(value);
                }}> <DropdownMenuRadioItem value="masterAdmin">Master Admin</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="managerCX">Customer Support - Manager</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="customerSupport">Customer Support</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="managerInventory">Invetory Manager</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="vendorInventory">Inventory Vendor</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="companyInstaller">Company Installer</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="managerAffiliate">ReadiCharge Affiliate</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="readichargeSalesPerson">ReadiCharge Sales Person</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="affiliateViaNetwork">Affiliate via Network</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="independentAffiliate">Independent Affiliate</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );

}
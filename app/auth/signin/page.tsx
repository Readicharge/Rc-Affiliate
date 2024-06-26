import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "@/components/forms/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication For ReadiCharge",
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0" >
  <div style={{ position:'fixed' ,top:0,left:0,width:"100%",height:"100%",backgroundImage: `url('https://readicharge.com/wp-content/uploads/2023/03/banner3.jpg')`, backgroundSize:'cover', backgroundPosition: 'cover',backgroundBlendMode:'difference', filter:'blur(20px)',zIndex:-1}}> </div>
      <div className="relative hidden h-full flex-col  p-10 text-white  lg:flex" >
        <div className="absolute inset-0" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image height={200} width={200} src={"https://readicharge.com/wp-content/uploads/2022/02/logo.png"} alt="ReadiCharge Logo" />
        </div>
        <div className="p-4 lg:p-8 h-full flex items-center">
        <div className=" bg-transparent border-none rounded mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]" style={{zIndex:200,borderRadius:23, padding:10}}>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
       
      </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { signUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
export const SignupForm = () => {
  const {checkAuthUser,isLoading:isUserLoading} = useUserContext()
  const {mutateAsync:createUserAccount,isPending:isCreatingAccount} = useCreateUserAccount()
  const {mutateAsync:signInAccount,isPending:isSigningIn} = useSignInAccount()

  const navigate = useNavigate()
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      username: "",
    },
  });

  const onSubmit = async (vals: z.infer<typeof signUpSchema>) => {
    console.log(vals);

    
    const newUser = await createUserAccount({
      email:vals.email,
      password:vals.password,
      name:vals.name,
      username:vals.username
    });
   
  
    if(!newUser){
      return toast.error("Failed to create new user!",{style:{backgroundColor:"red"}})
    }
   
   
    const session = await signInAccount({
      email:vals.email,
      password:vals.password
    })

    if(!session){
      return toast.error("Sign in failed please try again",{style:{backgroundColor:"red"}})
    }
   const  isLoggedIn = await checkAuthUser()

   if(isLoggedIn){
    form.reset(),
    navigate("/")
   }else{
    return toast.error("Sign up failed",{style:{backgroundColor:"red"}})
   }
    
  };



  return (
    <div className=" w-full flex flex-col justify-evenly p-12 gap-y-4 py-4">
      <div className=" w-full relative flex flex-col items-center justify-center">
        <img
          src="/assets/images/logo.svg"
          alt="logo"
          className=" w-full h-[50px]"
        />
        <h2 className=" h3-bold md:h2-bold pt-2 sm:pt-8">
          Create a new account
        </h2>
        <p className=" text-light-3 small-medium md:base-regular mt-2">
          To use snapgram please enter your details
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" w-full h-full flex flex-col gap-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder=" Enter your name" className=" text-zinc-900 font-semibold"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder=" Enter your email"
                      className=" text-zinc-900 font-semibold" 
                      {...field}

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder=" Enter your username" {...field} className=" text-zinc-900 font-semibold" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className=" text-zinc-900 font-semibold" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className={cn("shad-button_primary w-full")}
              disabled={isLoading}
              type="submit"
            >
              {isLoading && <Loader2 className=" animate-spin w-5 h-5 ml-2" />}
              Sign Up
            </Button>

            <p className="text-small-regular text-light-2 text-center">
              Already have an account?
              <Link
                to={"/sign-in"}
                className=" text-small-semibold text-primary-500 ml-1"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

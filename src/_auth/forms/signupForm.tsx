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
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
export const SignupForm = () => {
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
    const newUser = await createUserAccount(vals);
    form.reset();
    console.log(newUser);
  };

  const isLoading = form.formState.isLoading;

  return (
    <div className=" w-full flex flex-col justify-evenly p-12 gap-y-6">
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

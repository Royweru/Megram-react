import { Button } from "@/components/ui/button";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { signInSchema } from "@/lib/schemas";
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
import {
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
export const SigninForm = () => {
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (vals: z.infer<typeof signInSchema>) => {
    console.log(vals);
    const session = await signInAccount({
      email: vals.email,
      password: vals.password,
    });

    if (!session) {
      return toast.error("Sign In failed please try again!", {
        style: { backgroundColor: "red" },
      });
    }
    
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset(), navigate("/");
      toast.success("You have been successfully signed In", {
        style: { backgroundColor: "green" },
      });
    } else {
      return toast.error("Sign up failed last one", {
        style: { backgroundColor: "red" },
      });
    }
  };

  return (
    <div className=" w-full flex flex-col justify-evenly p-12 gap-y-6">
      <div className=" w-full relative flex flex-col items-center justify-center">
        <img
          src="/assets/images/logo.svg"
          alt="logo"
          className=" w-full h-[50px]"
        />
        <h2 className=" h3-bold md:h2-bold pt-2 sm:pt-8">
          Log in to your account
        </h2>
        <p className=" text-light-3 small-medium md:base-regular mt-2">
          We missed you, welcome back user
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" w-full h-full flex flex-col gap-y-4">
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
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className=" text-zinc-900 font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className={cn("shad-button_primary w-full")}
              disabled={isSigningIn}
              type="submit"
            >
              {isUserLoading && (
                <Loader2 className=" animate-spin w-5 h-5 ml-2" />
              )}
             Log in
            </Button>

            <p className="text-small-regular text-light-2 text-center">
             Don't have an account?
              <Link
                to={"/sign-up"}
                className=" text-small-semibold text-primary-500 ml-1"
              >
               Sign Up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

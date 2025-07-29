"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { isError } from "@/lib/helper";
import { toast } from "sonner";
import { LOGINURL } from "@/utils/constants";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" })
});

const MyLoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const param = useSearchParams();
  const previousPage = param.get("back");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const req = await fetch(LOGINURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const res = await req.json();
      if (!req.ok || res.error) throw new Error(res.error);
      
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      toast.success(res.message);
      location.assign(previousPage ? previousPage : "/");
    } catch (error: unknown) {
      if (isError(error)) {
        toast.error(error.message);
        console.error("Login failed", error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div>
      <div className="flex flex-col gap-5 px-6 py-6 rounded-lg w-full md:w-sm items-center justify-center shadow-md bg-background border border-border/50">
        <p className="text-lg font-extrabold">Login</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="e.g: example@youremail.com"
                      {...field}
                      type="email"
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="********"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-xs text-muted-foreground text-end">
              Forgot password? <Link href={"/forgot-password"} className="underline hover:text-primary duration-200">Reset password</Link>
            </p>

            <Button
              className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 
                <div className="flex gap-2 items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p>Logging in...</p>
                </div>
              : "Login"}
            </Button>
          </form>
        </Form>


        <div>
          <p className="text-center text-xs">
            Don&apos;t have an account? <Link href={"/register"} className="underline hover:text-primary ">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MyLoginForm;
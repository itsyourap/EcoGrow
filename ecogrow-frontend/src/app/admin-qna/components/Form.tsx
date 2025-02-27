"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface FormValues {
  username: string;
  email: string;
  feedback:string;
}

export function FormDemo() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      feedback:"",
    },
  });

  function onSubmit(data: FormValues) {
    toast.success("Form submitted!", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Username is required", minLength: {
              value: 2,
              message: "Username must be at least 2 characters"
            }}}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Username</FormLabel>
                <FormControl>
                  <Input placeholder="anindya" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            rules={{ 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="anindya@anindya.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="message-2">Your Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." id="message-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
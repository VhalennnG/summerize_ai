"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { registerUserAction } from "@/data/actions/auth-actions";
import { useFormState } from "react-dom";

const INITIAL_STATE = {
  data: "Welcome to the Sign Up page",
};

export function SignUpForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );

  console.log(formState, "Client");

  return (
    <div className='w-full max-w-md'>
      <form action={formAction}>
        <Card>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-3xl font-bold'>Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='username'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='name@example.com'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='password'
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col'>
            <button type='submit' className='w-full'>
              Sign Up
            </button>
          </CardFooter>
        </Card>
        <div className='mt-4 text-center text-sm'>
          Have an account?
          <Link className='underline ml-2' href='signin'>
            Sing In
          </Link>
        </div>
      </form>
    </div>
  );
}

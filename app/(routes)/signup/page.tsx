"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import InputField from "@/app/ui/InputField";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const onSignup = async (event: any) => {
    event.preventDefault();
    try {
      if (!user.name || !user.email || !user.password || !user.bio) {
        toast.error("All fields are required");
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        toast.error("Invalid Email");
        return;
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/auth/signup`,
        user
      );
      if (res.data.status === 200) {
        toast.success("Signup Successful");
        router.push("/login");
      }
      toast.success("Something went wrong, Please try again");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Signup failed", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-200">
            Create your account
          </h2>
        </div>

        <div className="mt-14 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(event) => onSignup(event)}
            method="POST"
          >
            <InputField
              user={user}
              setUser={setUser}
              type="text"
              label="Full Name"
              name="name"
            />
            <InputField
              user={user}
              setUser={setUser}
              type="text"
              label="Tell us about yourself!"
              name="bio"
            />
            <InputField
              user={user}
              setUser={setUser}
              type="email"
              label="Email Address"
              name="email"
            />
            <InputField
              user={user}
              setUser={setUser}
              type="password"
              label="Password"
              name="password"
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member? &nbsp;
            <Link
              href="/login"
              className="font-semibold leading-6 text-purple-600 hover:text-fuchsia-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

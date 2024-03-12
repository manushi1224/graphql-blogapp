"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<any>({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const closeAlert = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const loadAlertData = ({
    success,
    msg,
    load,
  }: {
    success: boolean;
    msg: string;
    load: boolean;
  }) => {
    setFormSuccess(success);
    setMessage(msg);
    setLoading(load);
    closeAlert();
  };

  const onSignup = async (event: any) => {
    event.preventDefault();
    try {
      if (!user.name || !user.email || !user.password || !user.bio) {
        loadAlertData({
          success: false,
          msg: "Please fill all the fields",
          load: true,
        });
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        loadAlertData({
          success: false,
          msg: " Invalid Email ID!",
          load: true,
        });
        return;
      }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/auth/signup`, user);
        if (res.data.status === 200) {
          loadAlertData({
            success: true,
            msg: "Account Created !",
            load: true,
          });
          router.push("/login");
        }
        loadAlertData({
          success: false,
          msg: res.data.message,
          load: true,
        });
    } catch (error: any) {
      setFormSuccess(false);
      console.log("Signup failed", error);
    }
  };

  return (
    <>
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
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  //   required
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Tell Us Something About you
              </label>
              <div className="mt-2">
                <input
                  id="bio"
                  name="bio"
                  type="text"
                  autoComplete="bio"
                  //   required
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  //   required
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-200"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  //   required
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

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

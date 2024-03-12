"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { montserrat } from "@/ui/fonts";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const LoginPage = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInfo?.email || !userInfo?.password) {
      return setError("Please fill in all fields");
    } else if (userInfo.password.length < 8) {
      return setError("Password must be at least 8 characters long");
    }

    try {
      setPending(true);

      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
        callbackUrl: process.env.NEXTAUTH_URL,
      });

      if (!res?.ok) {
        setError("Problem signing in");
      }

      if (!res?.ok) {
        setError("Invalid credentials");
        setPending(false);
        return;
      }

      setPending(false);
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MaxWidthWrapper className="bg-zinc-950 p-6 border border-zinc-700 text-white rounded-lg max-w-2xl justify-center mt-12 flex  flex-col gap-3 drop-shadow-md">
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-6 text-white`}
      >
        Login
      </h2>

      <form ref={ref} onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="example@email.com"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="********"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Login</Button>
        <p className="text-center text-sm">
          You don't have an account?{" "}
          <Link
            href={"/auth/register"}
            className="text-zinc-400 hover:font-medium hover:bg-zinc-800 duration-200"
          >
            Click here.
          </Link>
        </p>
      </form>
    </MaxWidthWrapper>
  );
};

export default LoginPage;

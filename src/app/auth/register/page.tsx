"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { montserrat } from "@/ui/fonts";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const ref = React.useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    username: "",
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

    if (!userInfo?.username || !userInfo?.email || !userInfo?.password) {
      return setError("Please fill in all fields");
    } else if (userInfo.username.length < 3) {
      return setError("Username must be at least 3 characters long");
    } else if (userInfo.password.length < 8) {
      return setError("Password must be at least 8 characters long");
    }

    try {
      setPending(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (res.ok) {
        setPending(false);
        ref?.current?.reset();
        router.push("/auth/login");
      } else {
        const errorData = await res.json();
        setError("Error: " + errorData?.message);
        console.log("something went wrong");
        setPending(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MaxWidthWrapper className="bg-white p-6 border border-gray-300 rounded-lg max-w-2xl justify-center mt-12 flex  flex-col gap-3 drop-shadow-md">
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-6 text-black`}
      >
        Register
      </h2>

      <form ref={ref} onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Jhon Doe"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <Button type="submit">Register</Button>
      </form>
    </MaxWidthWrapper>
  );
};

export default RegisterPage;

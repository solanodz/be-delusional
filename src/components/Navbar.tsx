"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import Image from "next/image";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="bg-black bg-opacity-85 border-b border-zinc-700 sticky top-0 right-0 left-0 mb backdrop-blur-xl z-50">
      <MaxWidthWrapper>
        <nav className=" min-h-16 flex justify-between gap-6 font-medium text-white  items-center">
          <div>
            <Link className=" hover:scale-110 duration-200" href="/">
              <Image
                src="/sz-blanco.png"
                alt="Logo SZ"
                width={50}
                height={50}
                className="p-1"
              />
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({ variant: "outline" })}
              >
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark">
                {!session?.data?.user ? (
                  <DropdownMenuLabel>
                    <Badge>You are not logged in</Badge>
                  </DropdownMenuLabel>
                ) : (
                  <DropdownMenuLabel className="text-muted-foreground">
                    <Badge>{session?.data?.user?.role}</Badge>
                  </DropdownMenuLabel>
                )}

                <DropdownMenuLabel>
                  {session?.data?.user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {session?.data?.user?.role === "ADMIN" && (
                  <Link href="/admin/dashboard">
                    <DropdownMenuItem className="font-bold cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuSeparator />
                {session?.data?.user && (
                  <Link href="/my-account">
                    <DropdownMenuItem className="cursor-pointer">
                      My account
                    </DropdownMenuItem>
                  </Link>
                )}
                <Link href="/blogs">
                  <DropdownMenuItem className="cursor-pointer">
                    Articles
                  </DropdownMenuItem>
                </Link>
                {session?.data?.user?.role === "ADMIN" && (
                  <Link
                    className=" hover:scale-110 duration-200"
                    href="/blogs/add-blog"
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      Create
                    </DropdownMenuItem>
                  </Link>
                )}
                {session?.data?.user && (
                  <button
                    className="w-full"
                    onClick={() => {
                      signOut();
                      redirect("/auth/login");
                    }}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      Sign out
                    </DropdownMenuItem>
                  </button>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {!session?.data?.user && (
              <Link
                className={buttonVariants({ variant: "default" })}
                href="/auth/login"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;

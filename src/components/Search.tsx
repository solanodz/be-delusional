/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const { replace } = useRouter();

  const handleSearch = (query: string) => {
    console.log("searched", query);
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    replace(`${pathName}?${params.toString()}`); // http://localhost:3000/blogs?query=whatever
  };

  return (
    <div className="">
      <Label htmlFor="search">Search</Label>

      <div className="gap-2 grid grid-flow-col max-w-xl">
        <div>
          <Input
            type="text"
            id="search"
            name="search"
            placeholder="Search by category or title..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <Button type="submit" variant={"default"} className="w-fit">
          <FaMagnifyingGlass />
        </Button>
      </div>
    </div>
  );
};

export default Search;

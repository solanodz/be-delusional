"use client";

import React, { useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { assignPermission } from "../../../actions/actions";
import { Badge } from "../ui/badge";

const AdminTable = ({ users }: any) => {
  const ref = useRef<HTMLFormElement | null>(null);
  const handleAssignPermission = async (formData: any) => {
    // if form is empty don't submit
    if (!formData.get("permission_name")) {
      return;
    }
    const userId = formData.get("userId");
    await assignPermission(userId, formData);
    ref.current?.reset();
  };

  return (
    <div className="bg-zinc-900">
      <Table className="bg-zinc-900">
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Assign Permissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.username}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell className="flex gap-1 flex-row flex-wrap">
                  {user?.permissions?.map((permission: any, index: number) => {
                    return (
                      <Badge className="w-fit" key={index}>
                        {permission.toUpperCase()}
                      </Badge>
                    );
                  })}
                </TableCell>
                <TableCell>
                  <form
                    ref={ref}
                    className="grid grid-flow-col w-64 items-center gap-2"
                    action={handleAssignPermission}
                  >
                    <Input type="hidden" name="userId" value={user?.id} />
                    <Input type="text" name="permission_name" />
                    <Button size={"sm"} type="submit">
                      Assign
                    </Button>
                  </form>
                </TableCell>
                <TableCell className="flex gap-3">
                  <Button size={"sm"}>Edit</Button>
                  <Button size={"sm"} variant="destructive">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTable;

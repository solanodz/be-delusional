import React from "react";
import { fetchUsers } from "../../../../actions/actions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { montserrat } from "@/ui/fonts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminTable from "@/components/admin/AdminTable";

const AdminDashboard = async () => {
  const users = await fetchUsers();

  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  if (!session?.user) {
    redirect("/auth/login");
  }
  return (
    <MaxWidthWrapper>
      <div className="text-white">
        <h2
          className={`${montserrat.className} font-bold text-4xl sm:text-5xl tracking-tighter my-12 text-white`}
        >
          Admin dashboard
        </h2>
        <div>
          <AdminTable users={users} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AdminDashboard;

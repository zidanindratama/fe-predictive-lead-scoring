import UserDatatable from "@/components/dashboard/users/user-datatable";
import { Suspense } from "react";

export default function DashboardUsersPage() {
  return (
    <>
      <Suspense>
        <UserDatatable />
      </Suspense>
    </>
  );
}

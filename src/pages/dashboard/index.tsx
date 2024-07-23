import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/navbar";
import TableDashboard from "@/components/table-dashboard";
import TableHeader from "@/components/table-header";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col h-screen justify-start items-center">
      <Navbar />
      <TableHeader />
      <TableDashboard />
    </div>
  );
}

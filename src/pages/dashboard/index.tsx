import Navbar from "@/components/navbar";
import TableDashboard from "@/components/table-dashboard";
import TableHeader from "@/components/table-header";

export default function Dashboard() {

  return (
    <div className="flex flex-col h-screen justify-start items-center">
      <Navbar />
      <TableHeader />
      <TableDashboard/>
    </div>
  );
}

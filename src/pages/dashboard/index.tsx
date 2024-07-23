import Navbar from "@/components/navbar";
import TableDashboard from "@/components/table-dashboard";
import TableHeader from "@/components/table-header";

export default function Dashboard() {
  const headers = ['Nome do grupo', 'Contatos', 'Ações'];

  const data = [
    { 'Nome do grupo': 'Grupo A', Contatos: 'João Silva - (11) 98765-4321', 'Ações': '' },
    { 'Nome do grupo': 'Grupo B', Contatos: 'Maria Oliveira - (21) 12345-6789', 'Ações': '' },
  ];

  return (
    <div className="flex flex-col h-screen justify-start items-center">
      <Navbar />
      <TableHeader />
      <TableDashboard headers={headers} data={data} />
    </div>
  );
}

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
  const { signOut } = useContext(AuthContext);

  function hanleSignOut() {
    try {
      signOut();
      window.location.href = '/';
    } catch (error) {
      console.error("Falha ao fazer logout:", error);
    }
  }
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center w-full">
      <div className="text-xl font-bold"><Link href="#">Megavendas</Link></div>
      <div className="flex space-x-4">
        <Link href="#" className="hover:text-gray-400">Home</ Link>
        <button onClick={hanleSignOut} className="text-red-dark">Sair</ button>
      </div>
    </nav>
  )
}
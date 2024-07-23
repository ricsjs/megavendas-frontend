import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center w-full">
      <div className="text-xl font-bold"><Link href="#">Megavendas</Link></div>
      <div className="flex space-x-4">
        <Link href="#" className="hover:text-gray-400">Home</ Link>
      </div>
    </nav>
  )
}
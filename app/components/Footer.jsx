import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col align-middle text-center w-1/2 mx-auto border-t border-gray-300 py-10 ">
        <p>&copy; 4G Store</p>
        <Link className="text-primary text-center w-24 mx-auto" href={'/dashboard'}>Dashboard</Link>
    </footer>
  )
}

import Link from "next/link";

export default function Dashboard() {
  return (
    <main>
        <h1>Dashboard</h1>
        <h2 className="text-gray-400">What do you want to do ?</h2>
        <section className="flex flex-col gap-5 text-gray">
        <Link className="hover:scale-105 hover:text-primary hover:px-10 duration-300 max-w-fit" href="/dashboard/editbundles">Change U-Share Bundles</Link>
        <Link className="hover:scale-105 hover:text-primary hover:px-10 duration-300 max-w-fit" href="/dashboard/editcards">Change Recharge Cards</Link>
        <Link className="hover:scale-105 hover:text-primary hover:px-10 duration-300 max-w-fit" href="/dashboard/editaccessories">Add / Remove Accessories</Link>
        </section>
    </main>
  )
}

"use client"
import { useState } from 'react';
import Burger from "../../public/burger.svg"
import x from "../../public/x.svg"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';

export default function MobileNavbar() {

        const pathname = usePathname();

        //handle menu open / close 
        const [isOpen, setIsOpen] = useState(false)
        const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div>
        {
            isOpen ?
            <div className='flex flex-col gap-10 justify-center align-middle absolute w-full left-0 text-center bg-black bg-opacity-50 py-10'>
                <Image  src={x} alt="menu button" onClick={toggleOpen} width={50} />
                <Link className={pathname==='/'?'text-primary text-xl':'text-white text-xl'} href={'/'}>Home</Link>
                <Link className={pathname==='/ushare'?'text-primary text-xl':'text-white text-xl'} href={'/ushare'}>u-share bundles</Link>
                <Link className={pathname==='/cards'?'text-primary text-xl':'text-white text-xl'} href={'/cards'}>recharge cards</Link>
                <Link className={pathname==='/accessories'?'text-primary text-xl':'text-white text-xl'} href={'/accessories'}>accessories</Link>
            </div>
            :
            <Image  src={Burger} alt="menu button" onClick={toggleOpen} width={50} />
        }
    </div>
  )
}

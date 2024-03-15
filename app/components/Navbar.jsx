"use client"
import { useState, useEffect } from 'react';
import Image from "next/image"
import Link from "next/link"
import Logo from "../../public/store-4g-Logo.png"
import MobileNavbar from './MobileNavbar';
import { useRouter, usePathname  } from "next/navigation"

export default function Navbar() {
    const router  = useRouter()
    const pathname = usePathname()

    // handle mobile / desktop view
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Initial check on component mount
      handleResize();
  
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
  return (
    <nav className='border-b-2 border-gray-200 w-full'>
        <Link href={'/'}>
        <Image 
            src={Logo}
            width={150}
            alt="logo"
            quality={100}
            placeholder='blur'
        />
        </Link>
        {
            !isMobile ? 
            <>
                <Link className={pathname ==='/'?'text-primary text-l':'text-l'} href={'/'}>Home</Link>
                <Link className={pathname ==='/ushare'?'text-primary text-l':'text-l'} href={'/ushare'}>u-share bundles</Link>
                <Link className={pathname ==='/cards'?'text-primary text-l':'text-l'} href={'/cards'}>recharge cards</Link>
                <Link className={pathname ==='/accessories'?'text-primary text-l':'text-l'} href={'/accessories'}>accessories</Link>
            </>
            :
            <MobileNavbar />
        }

    </nav>
  )
}

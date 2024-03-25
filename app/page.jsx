import Image from "next/image";
import Link from "next/link";
import alfa from "../public/alfa.png"
import alfaMtc from "../public/alfaMTc.jpg"
import accessories from "../public/accessories.jpg"
import banner from "../public/banner.png"
import Location from "./components/Location";
import Aboutus from "./components/Aboutus";
import Hello from "./components/Hello";
export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center p-4 gap-5">
      <Image
        src={banner}
        height={200}
        placeholder="blur"
        quality={100}
        alt="banner"
      />
      <Hello />
      <p className="text-xl my-10 ">Discover our collection of accessories, select what u-share bundle, or recharge cards you want to order.</p>
      <nav className="flex justify-center gap-5 flex-wrap my-8">
        <Link className="transition-transform transform hover:-translate-y-10 duration-1000" href="/ushare">
          <Image 
            src={alfa} 
            width={200}
            quality={100}
            alt="Ushare logo"
            placeholder="blur"
          />
          <p className="text-center text-xl text-black">U-Share Bundles</p>
        </Link>
        <Link className="transition-transform transform hover:-translate-y-10 duration-1000" href="/cards">
        <Image 
            src={alfaMtc} 
            height={200}
            quality={100}
            alt="cards logo"
            placeholder="blur"
          />
          <p className="text-center text-xl text-black">Recharge Cards</p>
        </Link>
        <Link className="transition-transform transform hover:-translate-y-10 duration-1000" href="/accessories">
        <Image 
            src={accessories} 
            width={200}
            quality={100}
            alt="accessories logo"
            placeholder="blur"
          />
          <p className="text-center text-xl text-black">Accessories</p>
        </Link>
      </nav>
      <Location />
      <Aboutus />
    </main>
  );
}

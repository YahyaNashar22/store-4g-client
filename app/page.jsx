import Image from "next/image";
import Link from "next/link";
import alfa from "../public/alfa.png"
import alfaMtc from "../public/alfaMTc.jpg"
import accessories from "../public/accessories.jpg"
import banner from "../public/banner.png"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <Image
        src={banner}
        height={200}
        placeholder="blur"
        quality={100}
        alt="banner"
      />
      {/* <h1 className="text-center text-primary text-6xl">4G Store</h1> */}
      <p className="text-xl my-10 ">Discover our collection of accessories, select what u-share bundle, or recharge cards you want to order.</p>
      <div className="flex justify-center gap-5 flex-wrap my-8">
        <Link className="transition-transform transform hover:-translate-y-10 duration-1000" href="/ushare">
          <Image 
            src={alfa} 
            width={200}
            quality={100}
            alt="Ushare logo"
            placeholder="blur"
          />
          <p className="text-center text-xl">U-Share Bundles</p>
        </Link>
        <Link className="transition-transform transform hover:-translate-y-10 duration-1000" href="/cards">
        <Image 
            src={alfaMtc} 
            height={200}
            quality={100}
            alt="cards logo"
            placeholder="blur"
          />
          <p className="text-center text-xl">Recharge Cards</p>
        </Link>
        <Link className="transition-transform transform hover:-translate-y-10 duration-1000" href="/accessories">
        <Image 
            src={accessories} 
            width={200}
            quality={100}
            alt="accessories logo"
            placeholder="blur"
          />
          <p className="text-center text-xl">Accessories</p>
        </Link>
      </div>
    </main>
  );
}

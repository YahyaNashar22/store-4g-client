import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";

const rubik = Rubik({ subsets: ["latin"] });

axios.defaults.withCredentials = true;

export const metadata = {
  manifest: "/manifest.json",
  title: "4G Store",
  description:
    "4G Store Website, here you can check all the accessories, phones and more! You will also be able to order your internet bundles, recharge cards online !",
};

export const viewport = {
  themeColor: "#3ab4fd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

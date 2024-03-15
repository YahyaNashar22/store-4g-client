import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "4G Store",
  description: "$G Store Website, here you can check all the accessories, phones and more! You will also be able to order your internet bundles, recharge cards online !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}

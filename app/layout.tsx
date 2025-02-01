import type { Metadata } from "next";
import "./globals.css";
// import localFont from 'next/font/local';
import { Vazirmatn } from 'next/font/google'
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const vazirmatn = Vazirmatn({
  subsets: ['latin'],
})

// const iranSans = localFont({
//   src: [
//     {
//       path: '../../public/assets/fonts/iranSans/IRANSans(FaNum).ttf',
//       weight: '500',
//       style: 'normal',
//     },
   
//   ],
// });


export const metadata: Metadata = {
  title: "Giti AI Model",
  description: "this is an Ai model made by giti developing team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl"> 
      <body className={`${vazirmatn.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

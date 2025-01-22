import type { Metadata } from "next";
import "./globals.css";
// import localFont from 'next/font/local';
import { Vazirmatn } from 'next/font/google'

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
      <body className={`${vazirmatn.className} antialiased`}>{children}</body>
    </html>
  );
}

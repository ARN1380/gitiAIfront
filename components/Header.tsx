import Image from "next/image";
import icon from "@/public/assets/images/icon.svg";
import gift from "@/public/assets/images/gift.svg";

export default function Header() {
  return (
    <header className="h-[75px] flex items-center justify-center bg-[#fff] shadow-sm sticky top-0">
        <div className="max-w-[1300px] w-full flex items-center gap-[60px]">
          <div className="flex items-center gap-[10px]">
            <Image src={icon} alt="logo" width={60} height={45} />
            <h1 className="font-bold text-2xl text-[#332C2B]">Giti Ai</h1>
          </div>
          <menu className=" flex justify-between flex-1">
            <ul className="flex gap-10 font-bold text-[#191925]">
              <li>کشف هوش مصنوعی</li>
              <li>کاتالوگ</li>
              <li>مقالات</li>
            </ul>
            <ul className="flex gap-10 text-[#787878]">
              <li>درباره ما</li>
              <li>قیمت</li>
            </ul>
          </menu>
          <button className="flex gap-4 bg-[#FEF6F2] rounded-full h-10 w-[186px] items-center justify-center">
            <p>رایگان ثبت نام کن</p>
            <Image src={gift} alt="logo" width={16} height={16} />
          </button>
        </div>
      </header>
  )
}
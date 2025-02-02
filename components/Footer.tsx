import Image from "next/image";
import icon from "@/public/assets/images/icon.svg";
import flowers from "@/public/assets/images/golmol.png";
import poweredBySimazi from "@/public/assets/images/powered by Simazi.png";

export default function Footer() {
  return (
    <footer className="min-h-[387px] grid grid-cols-4 bg-white shadow-sm">
      <div className="col-span-1 flex flex-col items-center justify-between">
        <div className="flex flex-col gap-[30px]">
          <div className="flex gap-[10px] items-center mt-[91px]">
            <Image src={icon} alt="logo" width={60} height={45} />
            <h1 className="font-bold text-2xl text-[#332C2B]">Giti Ai</h1>
          </div>
          <div>
            <Image src={poweredBySimazi} alt="Powered by Simazi" />
          </div>
        </div>
        <div className="self-start">
          <Image src={flowers} alt="flowers for background" />
        </div>
      </div>

      <menu className="col-span-3 mt-[86px] flex gap-40 w-full justify-center">
        <div>
          <h4 className="font-semibold text-[#212421] text-xl">شرکت ما</h4>
          <ul className="mt-10 flex flex-col gap-[30px]">
            <li>مقالات</li>
            <li>پادکست</li>
            <li>مشاغل</li>
            <li>اتاق اخبار</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#212421] text-xl">شرکت ما</h4>
          <ul className="mt-10 flex flex-col gap-[30px]">
            <li>تولید تصویر</li>
            <li>تولید ویدیو</li>
            <li>تولید متن</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#212421] text-xl">شرکت ما</h4>
          <ul className="mt-10 flex flex-col gap-[30px]">
            <li>سوالات متداول</li>
            <li>تماس بگیرید</li>
            <li>درباره ما</li>
          </ul>
        </div>
      </menu>
    </footer>
  );
}

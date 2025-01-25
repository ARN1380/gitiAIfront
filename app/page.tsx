import Image from "next/image";
import icon from "@/public/assets/images/icon.svg";
import gift from "@/public/assets/images/gift.svg";
import hero from "@/public/assets/images/hero-4x.png";
import filmIcon from "@/public/assets/images/film-icon.png";
import pictureIcon from "@/public/assets/images/picture-icon.png";
import firstBot from "@/public/assets/images/firstBot.png";
import secondBot from "@/public/assets/images/secondBot.png";
import thirdBot from "@/public/assets/images/thirdBot.png";
import gradiant1 from "@/public/assets/images/Ellipse 2.svg";
import gradiant2 from "@/public/assets/images/Ellipse 3E.svg";
import Tabs from "../components/Tabs";

export default function Home() {
  return (
    <>
      <header className="h-[75px] flex items-center justify-center bg-[#fff] shadow-sm">
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
      {/* background gradiant */}
      <Image
        src={gradiant1}
        alt="back"
        className="absolute top-52 right-0 left-0 m-auto -z-10 overflow-hidden"
      />
      <Image
        src={gradiant2}
        alt="back"
        className="absolute top-[1500px] right-0 left-0 m-auto -z-20 overflow-hidden"             
      />

      <main className="flex justify-center">
        <div className="max-w-[1300px] w-full flex flex-col items-center">
          {/* hero */}
          <section className="flex justify-center ">
            <div className="mt-[30px]">
              <Image src={hero} alt="hero" />
            </div>
          </section>
          {/* giti ai */}
          <section className="flex justify-center mt-[100px]">
            <div className="flex justify-center flex-col items-center ">
              <h1 className="capitalize text-[70px] font-bold bg-gradient-to-r from-[#3D16EC] to-[#FD247B] bg-clip-text text-transparent">
                giti ai
              </h1>
              <p className="text-[20px]">
                بهترین ابزار هوش مصنوعی، مدل های بزرگ، نسل هوش مصنوعی، تولید
                ویدئو را کشف کنید!
              </p>
              <div className="mt-[30px] flex gap-[20px]">
                <button className="px-[20px] py-4 gap-[10px] flex bg-white rounded-full border-[#E5E7EB] border items-center">
                  <p>تولید ویدیو</p>
                  <Image src={filmIcon} alt="logo" width={18} height={18} />
                </button>
                <button className="px-[20px] py-4 gap-[10px] flex bg-white rounded-full border-[#E5E7EB] border items-center">
                  <p>تولید تصویر</p>
                  <Image src={pictureIcon} alt="logo" width={18} height={18} />
                </button>
              </div>
            </div>
          </section>
          {/* ai features */}
          <section className="w-full mt-20">
            <div className="bg-white p-[30px] flex flex-col">
              <Tabs />
              
              <button className="bg-gradient-to-r from-[#3D16EC] to-[#FD247B] rounded-lg text-white w-[174px] h-[48px] mt-[20px] self-end ">
                تولید ویدئو
              </button>
            </div>
          </section>
          {/* texts */}
          <section className=" gap-[100px] mt-[200px] grid grid-cols-3">
            <div className="flex flex-col gap-[20px] col-span-2">
              <h3 className="text-2xl font-extrabold">
                جادوی هوش مصنوعی، عکس‌های شما را به زندگی می‌بخشد
              </h3>
              <p className="leading-10">
                تصور کنید عکس‌های خانوادگی شما، لحظه به لحظه زنده شوند. یا
                تصویری که از طبیعت گرفته‌اید، به یک فیلم کوتاه و جذاب تبدیل شود.
                با پیشرفت هوش مصنوعی، این رویا به واقعیت پیوسته است. حالا شما
                می‌توانید با یک کلیک ساده، عکس‌های خود را به ویدیوهای متحرک و
                پویا تبدیل کنید.
              </p>
            </div>
            <div className="col-span-1">
              <Image src={firstBot} alt="firstBot" width={300} />
            </div>
          </section>
          <section className=" gap-[100px] mt-[200px] grid grid-cols-3">
            <div className="col-span-1">
              <Image src={secondBot} alt="firstBot" width={300} />
            </div>
            <div className="flex flex-col gap-[20px] col-span-2">
              <h3 className="text-2xl font-extrabold">
                انقلاب تصویر، از عکس به ویدیو
              </h3>
              <p className="leading-10">
                در گذشته، عکس‌ها مانند پنجره‌هایی کوچک به دنیای گذشته بودند. اما
                امروزه، هوش مصنوعی این پنجره‌ها را به درهایی بزرگ تبدیل کرده است
                که ما را به دنیای متحرک و پویای تصاویر می‌برد. با تبدیل عکس به
                ویدیو، نه تنها به گذشته سفر می‌کنیم، بلکه می‌توانیم آینده را نیز
                تصور کنیم.
              </p>
            </div>
          </section>
          <section className=" gap-[100px] mt-[200px] grid grid-cols-3 mb-[200px]">
            <div className="flex flex-col gap-[20px] col-span-2">
              <h3 className="text-2xl font-extrabold">
                پشت پرده جادوی تبدیل عکس به ویدیو
              </h3>
              <p className="leading-10">
                شاید برایتان جالب باشد بدانید که چگونه یک عکس ثابت می‌تواند به
                یک ویدیوی متحرک تبدیل شود. این فرایند، با استفاده از
                الگوریتم‌های پیچیده هوش مصنوعی انجام می‌شود. این الگوریتم‌ها، با
                تحلیل پیکسل‌های یک تصویر، می‌توانند حرکت‌ها و تغییرات احتمالی را
                پیش‌بینی کرده و آن‌ها را به صورت یک ویدیو شبیه‌سازی کنند.
              </p>
            </div>
            <div className="col-span-1">
              <Image src={thirdBot} alt="firstBot" width={300} />
            </div>
          </section>
        </div>
      </main>

      <footer className="min-h-[387px] grid grid-cols-4 bg-white shadow-sm">
        <div className="col-span-1 flex flex-col items-center ">
          <div className="flex gap-[10px] items-center mt-[91px]">
            <Image src={icon} alt="logo" width={60} height={45} />
            <h1 className="font-bold text-2xl text-[#332C2B]">Giti Ai</h1>
          </div>
          <div></div>
        </div>

        <menu className="col-span-3 mt-[86px] flex gap-40 w-full">
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
              <li>مقالات</li>
              <li>پادکست</li>
              <li>مشاغل</li>
              <li>اتاق اخبار</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#212421] text-xl">شرکت ما</h4>
            <ul className="mt-10 flex flex-col gap-[30px]">
              <li>مقالات</li>
              <li>پادکست</li>
              <li>مشاغل</li>
              <li>اتاق اخبار</li>
            </ul>
          </div>
        </menu>
      </footer>
    </>
  );
}

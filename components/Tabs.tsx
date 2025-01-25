"use client";

import { useState } from "react";
import Features from "./Features";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabHandler = (tabId: number) => {
    setActiveTab(tabId);
  };


  return (
    <>
      <nav className="bg-[#F3F6F9] flex justify-around h-[84px] items-center px-20">
        <button
          onClick={() => tabHandler(0)}
          className={
            activeTab == 0
              ? "bg-[#041A43] text-white px-[30px] py-[10px] rounded-full"
              : ""
          }
        >
          سینمایی سازی تصویر
        </button>
        <button
          onClick={() => tabHandler(1)}
          className={
            activeTab == 1
              ? "bg-[#041A43] text-white px-[30px] py-[10px] rounded-full"
              : ""
          }
        >
          همگام سازی ویدیو
        </button>
        <button
          onClick={() => tabHandler(2)}
          className={
            activeTab == 2
              ? "bg-[#041A43] text-white px-[30px] py-[10px] rounded-full"
              : ""
          }
        >
          ساخت کلیپ با افکت
        </button>
        <button
          onClick={() => tabHandler(3)}
          className={
            activeTab == 3
              ? "bg-[#041A43] text-white px-[30px] py-[10px] rounded-full"
              : ""
          }
        >
          ساخت ویدیو سینمایی
        </button>
      </nav>    
      <Features activeTab={activeTab} />
    </>
  );
}

// سینمایی سازی تصویر
// همگام سازی ویدیو
// ساخت کلیپ با افکت
// ساخت ویدیو سینمایی

// bg-[#041A43] text-white px-[30px] py-[10px] rounded-full

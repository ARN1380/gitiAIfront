import Image from "next/image";
import galleryAdd from "@/public/assets/images/gallery-add.svg";
import videoAdd from "@/public/assets/images/video.svg";

export default function Features({activeTab}:{activeTab: number}) {
    
  switch (activeTab) {
    case 0:
        return (
            <>
            {/* upload section */}
            <div className="mt-[52px] flex gap-4">
                {/* image */}
                <div className="flex-1 flex flex-col gap-4">
                  <h6>انتخاب تصویر</h6>
                  <div className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center">
                    <Image src={galleryAdd} alt="logo" width={24} height={24} />
                    <p className="text-[#767676]">بارگذاری تصویر</p>
                  </div>
                  <div className="flex gap-2">
                    <p>حداکثر حجم تصویر:</p>
                    <p>20 مگابایت</p>
                  </div>
                </div>
                {/* video */}
                <div className="flex-1 flex flex-col gap-4">
                  <h6>انتخاب ویدئو</h6>
                  <div className="border-dashed border border-[#E5E7EB] rounded-lg min-h-[312px] flex items-center gap-2 justify-center">
                    <Image src={videoAdd} alt="logo" width={24} height={24} />
                    <p className="text-[#767676]">بارگذاری ویدیو</p>
                  </div>
                  <div className="flex gap-2">
                    <p>حداکثر حجم تصویر:</p>
                    <p>200 مگابایت</p>
                  </div>
                </div>
              </div>
            </>
          )
      break;
  
    case 1:
      
      break;
  
    case 2:
      
      break;
  
    case 3:
      
      break;
  
    default:
      break;
  }
  
}
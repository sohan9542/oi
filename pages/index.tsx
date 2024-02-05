import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import ComputerModal from "@/components/ComputerModal";
import TabletModal from "@/components/TabletModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 20;
  const [walking, setWalking] = useState<Number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [backgrondLoad, setBackgrondLoad] = useState(false)
  const [videoLoad, setVideoLoad] = useState(false)
  useEffect(() => {
    console.log("video load", videoLoad)
    if (backgrondLoad && videoLoad) {
      setTimeout(() => {
        setWalking(100)
      }, 5000);
    }
  }, [backgrondLoad, videoLoad])


  useEffect(() => {
    // Play the video when the component mounts
    if (videoRef.current) {
      setVideoLoad(true)
      videoRef.current.play().catch((error) => {
        // Autoplay might be blocked, handle the error here
        console.error("Autoplay blocked:", error);
      });
    }

    const slider = document.querySelector(".items") as HTMLElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    slider.addEventListener("mousedown", (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      slider.scrollLeft = scrollLeft - walk;

    });
  }, []);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [computerHoverDay, setComputerHoverDay] = useState(0);
  const [tabHoverDay, setTabHoverDay] = useState(0);


  return (
    <div className="relative  w-full ">
      {walking === null && (
        <div className=" fixed flex-col  lg:hidden top-[300px] left-[100px]  z-50  justify-center">
          <Image
            alt=""
            onClick={() => setOpen(true)}
            className="w-[140px]"
            src={"/assets/swipe.gif"}
            width={600}
            height={600}
          />
          <h1 className=" text-[20px] w-[150px] text-black font-bold">
            Swipe to move in any direction
          </h1>
        </div>
      )}
      <div className="items">
        {/* {isDayTime ? ( */}
        <div className="item relative">
          {open && <ComputerModal setOpen={setOpen} />}
          {open2 && <TabletModal setOpen={setOpen2} />}
          <Image
            alt=""
            className="background_image  relative z-10"
            src={"/desktop/d_background_3.webp"}
            width={2560}
            height={1200}
            onLoad={() => {
              setBackgrondLoad(true)
              console.log("background loaded")
            }}
          />

          <Image
            alt=""
            onClick={() => setOpen(true)}
            className="absolute computer z-30"
            src={"/desktop/d_TV_cut_outline.webp"}
            width={600}
            height={600}
            style={{ opacity: computerHoverDay }}
            onMouseEnter={() => setComputerHoverDay(1)}
            onMouseLeave={() => setComputerHoverDay(0)}
          />
          <div
            onMouseEnter={() => setComputerHoverDay(1)}
            onClick={() => setOpen(true)}
            className="absolute  computer_top  z-40"
          >
            <div className="w-10 h-10 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffff61]"></div>
            <div className="w-10 h-10 relative z-10 cursor-pointer rounded-full bg-[#0000006f]"></div>
          </div>
          <Image
            alt=""
            onClick={() => setOpen2(true)}
            className="absolute tablet z-30"
            src={"/desktop/d_tablet_cut_outline.webp"}
            width={600}
            style={{ opacity: tabHoverDay }}
            onMouseEnter={() => setTabHoverDay(1)}
            onMouseLeave={() => setTabHoverDay(0)}
            height={600}
          />
          <div
            onMouseEnter={() => setTabHoverDay(1)}
            onClick={() => setOpen2(true)}
            className="absolute  tab_top  z-40"
          >
            <div className="w-5 h-5 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffffad]"></div>
            <div className="w-5 h-5 relative z-10 cursor-pointer rounded-full bg-[#0000006f]"></div>
          </div>
          <video
            autoPlay
            muted
            loop
            ref={videoRef}
            className=" absolute z-[5] space_vid"
            width="640"
            height="360"
            playsInline

          >
            <source src="/assets/space_background_2.mp4" type="video/mp4" />
          </video>
        </div>
        {/* ) : (
          <div className="item relative">
            {open && <ComputerModal setOpen={setOpen} />}
            {open2 && <TabletModal setOpen={setOpen2} />}
            <Image
              alt=""
              className="background_image  relative z-10"
              src={"/desktop/n_background_2.webp"}
              width={2560}
              height={1200}
            />

            <div onClick={() => setOpen(true)} className="n_computer">
              <Image
                alt=""
                className="absolute n_computer_de z-30"
                src={"/desktop/n_TV_cut_outline.webp"}
                width={600}
                height={600}
              />
              <Image
                alt=""
                className="absolute n_light z-30"
                src={"/desktop/n_light_2.webp"}
                width={600}
                height={600}
              />
            </div>
            <div className="absolute  computer_top  z-40">
              <div className="w-10 h-10 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffff61]"></div>
              <div className="w-10 h-10 relative z-10 cursor-pointer rounded-full bg-[#0000006f]"></div>
            </div>
            <div onClick={() => setOpen2(true)} className="n_tablet">
              <Image
                alt=""
                className="absolute n_tablet_de z-30"
                src={"/desktop/n_tablet_cut_outline.webp"}
                width={600}
                height={600}
              />
              <Image
                alt=""
                className="absolute n_tablet_light z-30"
                src={"/desktop/n_light_1.webp"}
                width={600}
                height={600}
              />
            </div>
            <div
              onMouseEnter={() => setTabHoverDay(1)}
              onClick={() => setOpen2(true)}
              className="absolute  tab_top  z-40"
            >
              <div className="w-5 h-5 animate-ping duration-300 ease-linear absolute top-0 rounded-full left-0 bg-[#ffffffad]"></div>
              <div className="w-5 h-5 relative z-10 cursor-pointer rounded-full bg-[#0000006f]"></div>
            </div>
            <video
              autoPlay
              muted
              loop
              ref={videoRef}
              className=" absolute z-[5] space_vid"
              width="640"
              height="360"
              playsInline
            >
              <source src="/assets/space_background_2.mp4" type="video/mp4" />
            </video>
          </div>
        )} */}
      </div>
      {(videoLoad  && backgrondLoad) ? <></> : <div className=" fixed bg-[#fff] flex items-center justify-center top-0 left-0 w-full h-full z-[100]">
        <Image
          alt=""

          src={"/loading.gif"}
          width={200}
          height={200}

        />
      </div>}
    </div>
  );
}

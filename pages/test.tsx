import Image from 'next/image';
import React, { useEffect } from 'react'

const Test = () => {
    useEffect(() => {
        const slider = document.querySelector('.items') as HTMLElement;
        let isDown = false;
        let startX: number;
        let scrollLeft: number;
        
        slider.addEventListener('mousedown', (e: MouseEvent) => {
          isDown = true;
          slider.classList.add('active');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
          isDown = false;
          slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
          isDown = false;
          slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e: MouseEvent) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 3; // scroll-fast
          slider.scrollLeft = scrollLeft - walk;
          console.log(walk);
        });
        
    }, [])
    
  return (
    <div className="items ">
    <div className="item  ">
    <Image
        alt=""
        className="background_image item relative z-10"
        src={"/desktop/d_background_3.webp"}
        width={2560}
        height={1200}
      />
    </div>

  </div>
  )
}

export default Test
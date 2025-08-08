import React, { useEffect, useRef, useState } from "react";


function Hcategory() {
  // Duplicate items for infinite scroll

  const [isMobile, setIsMobile] = useState(false);

  const trackRef = useRef(null);
    const animationRef = useRef(null);
    const itemWidth = useRef(0);
    const totalItems = cardItems.length * 3; // 3 sets of items for smooth looping
    const animationDuration = 20; // seconds for one complete loop
  
    // useEffect(() => {
    //   const checkScreen = () => {
    //     setIsMobile(window.innerWidth <= 600);
    //   };
  
    //   checkScreen();
    //   window.addEventListener("resize", checkScreen);
      
    //   // Set up animation
    //   const track = trackRef.current;
    //   if (track) {
    //     const item = track.firstChild;
    //     if (item) {
    //       itemWidth.current = item.offsetWidth + 30; // width + margin
    //     }
        
    //     // Reset position periodically to create infinite effect
    //     const resetPosition = () => {
    //       if (!track) return;
    //       track.style.transition = 'none';
    //       track.style.transform = 'translateX(0)';
    //       // Force reflow
    //       void track.offsetWidth;
    //       track.style.transition = `transform ${animationDuration}s linear`;
    //       track.style.transform = `translateX(-${itemWidth.current * cardItems.length}px)`;
    //     };
  
    //     // Start the animation
    //     const startAnimation = () => {
    //       track.style.transition = `transform ${animationDuration}s linear`;
    //       track.style.transform = `translateX(-${itemWidth.current * cardItems.length}px)`;
    //     };
  
    //     // Set up animation loop
    //     const animate = () => {
    //       startAnimation();
    //       // Reset position after each complete cycle
    //       const timer = setInterval(() => {
    //         resetPosition();
    //         startAnimation();
    //       }, animationDuration * 1000);
          
    //       return () => clearInterval(timer);
    //     };
  
    //     const timer = setTimeout(animate, 0);
        
    //     return () => {
    //       clearTimeout(timer);
    //       if (animationRef.current) {
    //         cancelAnimationFrame(animationRef.current);
    //       }
    //     };
    //   }
  
    //   return () => {
    //     window.removeEventListener("resize", checkScreen);
    //   };
    // }, []);
  
    // const itemsToShow = [];
    // // Create multiple sets of items for smooth looping
    // for (let i = 0; i < 3; i++) {
    //   itemsToShow.push(...cardItems);
    // }

  return (
    <>
         <section className="New-section-6">
      <div className="main-New-section-6">
        <div className="category-carousel-wrapper" style={{
          overflow: 'hidden',
          width: '100%',
        }}>
          <div 
            ref={trackRef}
            className="category-main-four-card category-carousel-track"
            style={{
              display: 'flex',
              width: 'max-content',
              willChange: 'transform',
            }}
          >
            {itemsToShow.map((item, index) => (
              <div 
                key={index} 
                className="New-category-card"
                style={{
                  flex: '0 0 auto',
                  margin: '0 15px',
                }}
              >
                <div className="flex-item-box">
                  <div className="category-img">
                    <img src={item.img} alt="" />
                  </div>  
                  <h2>{item.text}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Hcategory;

"use client"
let fillerText = "Hello World "
for (let i = 0; i < 8; i++) {
  fillerText = fillerText + fillerText + i
  
}
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import GScroll from "@grcmichael/gscroll"
import { useEffect } from "react"


export default function Home() {
  useEffect(()=>{
    const scroll = new GScroll( "#scroll-section", 0.4, () => ScrollTrigger.update() )
    scroll.init()
    scroll.wheel()
    const scroller = document.getElementById('scroll-section')
    ScrollTrigger.defaults({
      scroller: scroller
    })
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          scroll.current = -value // setter
        }
        return -scroll.current // getter
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight}
      }
    });
    
    
    window.addEventListener('resize', () => {
      scroll.resize()
    })
    // test animation
    gsap.to('#scroll-section', {
      backgroundColor: "black",
      ease:'none',
      scrollTrigger: {
        trigger:'img',
        start:'top top',
        end:'bottom bottom',
        scrub:0.5
      }
    })
  })
  return (
    <>
    <div className="text-5xl" id="scroll-section">
    {fillerText}

    </div>
    </>
  )
}
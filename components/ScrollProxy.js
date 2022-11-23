"use client"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import GScroll from "@grcmichael/gscroll"
import { useEffect } from "react"


export default function ScrollProxy({children}) {
  useEffect(()=>{
    const scroll = new GScroll( "#scroll-section", 0.5, () => ScrollTrigger.update() )
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
  })
  return (
    <div className="min-h-[100vh]" id="scroll-section">
      {children}
    </div>
  )
}
"use client"
let fillerText = "Hello World "
for (let i = 0; i < 8; i++) {
  fillerText = fillerText + fillerText + i
  
}
import gsap from "gsap"
import GScroll from "@grcmichael/gscroll"
import { useEffect } from "react"


export default function Home() {
  useEffect(()=>{
    const scroll = new GScroll( "#scroll-section", 0.6 )
    scroll.init()
    scroll.wheel()
  })
  return (
    <>
    <div className="text-5xl" id="scroll-section">
    {fillerText}

    </div>
    </>
  )
}
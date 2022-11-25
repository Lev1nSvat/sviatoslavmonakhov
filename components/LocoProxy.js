"use client"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import { useEffect } from "react"
import dynamic from 'next/dynamic'
import LocomotiveModule from "locomotive-scroll"

export default function LocoProxy({children, el}) {
  useEffect(()=>{ 
    
    // --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveModule({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
    smartphone:{smooth:true},
    tablet:{smooth:true},
  })
  console.log(locoScroll)
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.defaults({ scroller: ".smooth-scroll" });
  
  // --- SETUP END ---
  
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  })
  return (
    <div ref={el} data-scroll-container className="min-h-[100vh] smooth-scroll" id="scroll-section">
      {children}
    </div>
  )
}
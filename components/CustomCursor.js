import { useEffect } from "react";
import gsap from "gsap";
import CSSPlugin from "gsap/CSSPlugin";
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CSSPlugin)

export default function CustomCursor() {
  useEffect(()=> {
    let cashPosition = {}
    let speed
    let rotation
    let yDif, xDif
    gsap.set(".translate-half", {yPercent:-50,xPercent:-50})
    document.body.style.cursor = 'none';
    gsap.utils.toArray('.cursor').forEach(a => {
      let appear = gsap.to(a, {opacity:1, paused: true, ease: "power2", duration:0.9});
      document.querySelector("body").addEventListener("mouseleave", () => {appear.reverse()});
      document.querySelector("body").addEventListener("mouseenter", () => {appear.play()});
      document.querySelector("body").addEventListener("mousemove", () => {appear.play()});
    });
    function movePointer(event) { 
      gsap.set("#pointer", {x:event.clientX, y:event.clientY});
      cashPosition.clientX&&(speed = Math.abs(cashPosition.clientX - event.clientX) + Math.abs(cashPosition.clientY - event.clientY))
      cashPosition.clientX&&(rotation = 90 * ( (cashPosition.clientX - event.clientX) / ( Math.abs(cashPosition.clientX - event.clientX) + Math.abs(cashPosition.clientY - event.clientY) )));
      cashPosition.clientY - event.clientY >0 ? rotation = -rotation : 0
      //(cashPosition.clientX - event.clientX < 0 && cashPosition.clientY - event.clientY < 0) || (cashPosition.clientX - event.clientX > 0 && cashPosition.clientY - event.clientY > 0) ? rotation = rotation : rotation += 90
      cashPosition.clientX = event.clientX; cashPosition.clientY = event.clientY;
      deformCursor(speed, rotation) 
      console.log(rotation)
    }
    function deformCursor(speed, rotation) {
      Math.round(rotation)
      speed*=0.03;
      speed<1 ? speed = 1 :
      speed>3 ? speed = 3 :
      gsap.set(".cursor", {rotate:rotation, duration:0.2})
      gsap.to("#circle", {scaleY:speed,scaleX:1/speed, duration:0.1, onComplete:()=>{gsap.to("#circle", {scaleY:1,scaleX:1})}})
      gsap.to("#pointer", {scaleY:speed*2,scaleX:1/speed/2, duration:0.1, onComplete:()=>{gsap.to("#pointer", {scaleY:1,scaleX:1})}})
    }
    function moveCircle(event)  { gsap.to("#circle", {x:event.clientX, y:event.clientY, duration:0.5, ease:"power1"}); }
    window.addEventListener("mousemove", (event)=> movePointer(event))
    let controller = new AbortController();
    window.addEventListener("mousemove", (event)=> moveCircle(event), {signal: controller.signal})
    document.querySelectorAll(".magic-hover").forEach((a)=>{
      let updateInterval 
      a.addEventListener('mouseenter',()=> {
        controller.abort();
        gsap.to(".translate-half", {yPercent:0,xPercent:0});
        gsap.to("#circle", {y:(a.getBoundingClientRect().y - 5),x:(a.getBoundingClientRect().x - 5),width: (a.offsetWidth + 10), height:(a.offsetHeight + 10), borderRadius: 35})
        updateInterval = setInterval(()=>{ 
          gsap.to("#circle", {y:(a.getBoundingClientRect().y - 5),duration: 0.4 })
        }, 1)
      })
      a.addEventListener('mouseleave',()=> {
        controller = new AbortController();
        clearInterval(updateInterval);
        gsap.to(".translate-half", {yPercent:-50,xPercent:-50});
        window.addEventListener("mousemove", (event)=> moveCircle(event), {signal: controller.signal});
        gsap.to("#circle", {width:"72", height:"72",borderRadius: 36}); moveCircle(cashPosition)})
    })
    gsap.utils.toArray('#circle').forEach(a => {
      let hover = gsap.to(a, {width:"72", height:"72" , paused: true, ease: "power2", duration:0.4});
      document.querySelector("body").addEventListener("mouseleave", () => {hover.reverse()});
      document.querySelector("body").addEventListener("mouseenter", () => {hover.play()});
      document.querySelector("body").addEventListener("mousemove", () => {hover.play()});
    });
  })
  return (
    <>
      <div id="pointer" className="bg-blend-difference  pointer-events-none cursor rounded-lg opacity-0 h-3 w-3 absolute z-50 translate-x-[-50%] translate-y-[-50%] bg-carousel-pink-500 mix-blend-difference"></div>
      <div id="circle" className="pointer-events-none cursor rounded-[36px] opacity-0 h-3 w-3 translate-half absolute z-50 border-carousel-pink-500 border-solid border-[2px] mix-blend-difference"></div>
    </>
  )
}
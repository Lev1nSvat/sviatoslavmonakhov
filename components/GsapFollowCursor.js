import { useEffect, useRef } from "react"
import gsap from "gsap";

export default function GsapFollowCursor({}) {
  let cursor = useRef();
  let q = gsap.utils.selector(cursor);
  useEffect(()=>{
    let allowDeform, targetRect, isHover = false, cursorPositionCash = {}, speed, direction = 0,
    opacity = gsap.quickTo(q("div"), "opacity", {}),
    followerWidth = gsap.quickTo(q("#follower"), "width", {ease:"power4"}),
    followerHeight = gsap.quickTo(q("#follower"), "height", {ease:"power4"}),
    pointerX = gsap.quickSetter(q("#pointer"), "x", "px"),
    pointerY = gsap.quickSetter(q("#pointer"), "y", "px"),
    followerX = gsap.quickTo(q("#follower"), "x", {ease: "power4", duration: 1}),
    followerY = gsap.quickTo(q("#follower"), "y", {ease: "power4", duration: 1}),
    followerYPercent = gsap.quickTo(q("#follower"), "yPercent", {ease: "power4", duration: 1}),
    followerXPercent = gsap.quickTo(q("#follower"), "xPercent", {ease: "power4", duration: 1}),
    directionSetter = gsap.quickSetter(q(".cursor"), "rotate", "deg"),
    followerShrink = gsap.quickTo(q("#follower"), "scaleX", {duration:0.2}),
    followerSctretch = gsap.quickTo(q("#follower"), "scaleY", {duration:0.2}),
    pointerShrink = gsap.quickTo(q("#pointer"), "scaleX", {duration:0.2}),
    pointerSctretch = gsap.quickTo(q("#pointer"), "scaleY", {duration:0.2})
    
    gsap.set("body", {cursor:"none"})
    gsap.set("a", {cursor:"none"})
    gsap.set(cursor.current, {position:"fixed", pointerEvents:"none", zIndex:9999})
    gsap.set(q("#pointer"), {position:"fixed", xPercent:-50, yPercent:-50, opacity:0, width:12, height:12, borderRadius: 6, backgroundColor:"#FEE3EC", })
    gsap.set(q("#follower"), {position:"fixed", xPercent:-50, yPercent:-50, opacity:0, borderRadius: 36, borderWidth:2, borderColor:"#FEE3EC"})
    document.body.addEventListener("mouseover", () => {
      opacity(1);
      followerHeight(72);
      followerWidth(72);
    })
    document.body.addEventListener("mousemove", (event) => {
      if (cursorPositionCash.x) speed = Math.abs(cursorPositionCash.x - event.x) + Math.abs(cursorPositionCash.y - event.y)
      direction = 180 + ((Math.round(90 * (cursorPositionCash.x - event.x) / (Math.abs(cursorPositionCash.x - event.x) + Math.abs(cursorPositionCash.y - event.y))))*((cursorPositionCash.y - event.y)<=0 ? 1 : -1))
      cursorPositionCash.x = event.x
      cursorPositionCash.y = event.y
      opacity(1);
      pointerX(event.x);
      pointerY(event.y);
      if (!isHover) {
        followerHeight(72);
        followerWidth(72);
        followerX(event.x);
        followerY(event.y);
        deformCursor()
      }
    })
    document.body.addEventListener("mouseleave", () => {
      opacity(0);
      followerHeight(0);
      followerWidth(0);
    })

    document.querySelectorAll(".magic-hover").forEach((a)=>{
      let hoverUpdate
      a.addEventListener('mouseenter',()=> {
        isHover = true;
        followerXPercent(0);
        followerYPercent(0);
        hoverUpdate = setInterval(() => {
          targetRect = a.getBoundingClientRect()
          followerHeight(targetRect.height);
          followerWidth(targetRect.width);
          followerX(targetRect.x);
          followerY(targetRect.y);
        },10)
      })
      a.addEventListener('mouseleave',()=> {
        isHover = false;
        followerXPercent(-50);
        followerYPercent(-50);
        followerX(cursorPositionCash.x);
        followerY(cursorPositionCash.y);
        clearInterval(hoverUpdate)
      })
    })
    function deformCursor() {
      if (!direction) {
        return
      }
      console.log(direction)
      speed > 100 ? speed = 100 :
      followerSctretch(1+speed*0.03)
      followerShrink(1-speed*0.005)
      speed > 70 ? speed = 70 :
      pointerShrink(1-speed*0.02)
      pointerSctretch(1+speed*0.06)
      directionSetter(direction)
      setTimeout(()=>{
        followerShrink(1)
        followerSctretch(1)
        pointerSctretch(1)
        pointerShrink(1)
      }, 200)
      gsap.to(q("#follower"), {rotate:direction, duration:0.0001, ease:"power4" })
    }
  })
  return (
    <div style={{mixBlendMode:"difference"}} ref={cursor}>
      <div className="cursor" id="pointer"></div>
      <div className="cursor" id="follower"></div>
    </div>
  )
}
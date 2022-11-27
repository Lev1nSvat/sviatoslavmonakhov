import { useEffect, useRef } from "react"
import gsap from "gsap";
import { isMobile } from "react-device-detect";

export default function GsapFollowCursor({}) {
  let cursor = useRef();
  let q = gsap.utils.selector(cursor);
  useEffect(()=>{
    if(isMobile) return null
    
    //premade tweens for better perfomance 
    let targetRect, isHover = false, rotatePause = false, cursorPositionCash = {}, speed, direction = 0,
    opacity = gsap.quickTo(q("div"), "opacity", {}),
    followerWidth = gsap.quickTo(q("#follower"), "width", {ease:"power4"}),
    followerHeight = gsap.quickTo(q("#follower"), "height", {ease:"power4"}),
    pointerX = gsap.quickSetter(q("#pointer"), "x", "px"),
    pointerY = gsap.quickSetter(q("#pointer"), "y", "px"),
    followerX = gsap.quickTo(q("#follower"), "x", {ease: "power4", duration: 1}),
    followerY = gsap.quickTo(q("#follower"), "y", {ease: "power4", duration: 1}),
    followerXFast = gsap.quickTo(q("#follower"), "x", {duration:0.1}),
    followerYFast = gsap.quickTo(q("#follower"), "y", {duration:0.1}),
    followerYPercent = gsap.quickTo(q("#follower"), "yPercent", {ease: "power4", duration: 1}),
    followerXPercent = gsap.quickTo(q("#follower"), "xPercent", {ease: "power4", duration: 1}),
    pointerDirectionSetter = gsap.quickSetter(q("#pointer"), "rotation", "deg"),
    followerDirectionSetter = gsap.quickTo(q("#follower"), "rotation", {duration:0.01}),
    followerSctretch = gsap.quickTo(q("#follower"), "scaleY", {duration:0.01}),
    followerShrink = gsap.quickTo(q("#follower"), "scaleX", {duration:0.01}),
    followerShadow = gsap.quickSetter(q("#follower"), "boxShadow", ""),
    pointerSctretch = gsap.quickTo(q("#pointer"), "scaleY", {duration:0.1}),
    pointerShrink = gsap.quickTo(q("#pointer"), "scaleX", {duration:0.1})
    
    //styling
    gsap.set("body", {cursor:"none"})
    gsap.set("a", {cursor:"none"})
    gsap.set(cursor.current, {position:"fixed", pointerEvents:"none", zIndex:9999})
    gsap.set(q("#pointer"), {position:"fixed", xPercent:-50, yPercent:-50,y:"100vh", opacity:0, width:12, height:12, borderRadius: 6, backgroundColor:"#FEE3EC", })
    gsap.set(q("#follower"), {position:"fixed", xPercent:-50, yPercent:-50,x:"50vw",y:"120vh", opacity:0, borderRadius: 36, borderWidth:2, borderColor:"#FEE3EC"})
    
    //reveal and hide cursor
    document.body.addEventListener("mouseover", () => {
      opacity(1);
      followerHeight(72);
      followerWidth(72);
    })
    
    document.body.addEventListener("mouseleave", () => {
      opacity(0);
      followerHeight(0);
      followerWidth(0);
    })
    
    //update cursor 
    document.body.addEventListener("mousemove", (event) => {
      pointerX(event.x);
      pointerY(event.y);
      deformPointer()
      
      //approximatly calculate cursor speed and direction
      if (cursorPositionCash.x) {
        speed = Math.abs(cursorPositionCash.x - event.x) + Math.abs(cursorPositionCash.y - event.y)
        direction =((Math.round(90 * (cursorPositionCash.x - event.x) / (Math.abs(cursorPositionCash.x - event.x) + Math.abs(cursorPositionCash.y - event.y))))*((cursorPositionCash.y - event.y)<=0 ? 1 : -1))+((cursorPositionCash.y - event.y)<=0 ? 180 : 0)
      } 
      cursorPositionCash.x = event.x
      cursorPositionCash.y = event.y
      
      if (!isHover) {
        followerX(event.x);
        followerY(event.y);
      }
    })
    
    //approximatly calculate follower speed and direction and deform it accordingly
    let follower = document.querySelector("#follower"),followerSpeed, followerDirection, followerCash = {}, followerCurrent
    setInterval(()=> {
      followerCurrent = follower.getBoundingClientRect();
      followerCurrent.x = ( followerCurrent.x + followerCurrent.width/2 )
      followerCurrent.y = ( followerCurrent.y + followerCurrent.height/2 )
      followerSpeed = Math.abs(followerCash.x - followerCurrent.x) + Math.abs(followerCash.y - followerCurrent.y)
      followerDirection = (((90 * (followerCash.x - followerCurrent.x) / (Math.abs(followerCash.x - followerCurrent.x) + Math.abs(followerCash.y - followerCurrent.y))))*((followerCash.y - followerCurrent.y)<=0 ? 1 : -1))+((followerCash.y - followerCurrent.y)<=0 ? 180 : 0)
      followerCash.x = followerCurrent.x
      followerCash.y = followerCurrent.y
      deformFollower()
    },10)

    //hover effect
    document.querySelectorAll(".magic-hover").forEach((a)=>{
      let hoverUpdate
      a.addEventListener('mouseenter',()=> {
        isHover = true;
        followerXPercent(0);
        followerYPercent(0);
        followerDirectionSetter(0);
        followerShrink(1);
        followerSctretch(1);
        followerShadow("none")

        //check if adjustments are needed 
        hoverUpdate = setInterval(() => {
          targetRect = a.getBoundingClientRect()
          followerHeight(targetRect.height);
          followerWidth(targetRect.width);
          followerX(targetRect.x);
          followerY(targetRect.y);
        },10)
      })

      a.addEventListener('mouseleave',()=> {
        isHover = false
        rotatePause = true 
        setTimeout(()=> rotatePause = false, 150)
        followerDirectionSetter(0)
        followerXPercent(-50);
        followerYPercent(-50);
        followerX(cursorPositionCash.x);
        followerY(cursorPositionCash.y);
        clearInterval(hoverUpdate)
      })
    })
    
    const clampValue = gsap.utils.clamp(0.5, 4)

    function deformPointer() {
      
      if(speed) {
        pointerSctretch(clampValue(1+speed*0.03 ));
        pointerShrink(clampValue(1-speed*0.005));

        //cleanup
        setTimeout(()=>{
          pointerSctretch(1);
          pointerShrink(1);
        },100)
      }

      direction&&pointerDirectionSetter(direction);
      
    }

    function deformFollower() {
      if(!rotatePause&&!isHover&&followerDirection&&followerSpeed) {
        followerSctretch(clampValue(1+followerSpeed*0.05 ));
        followerShrink(clampValue(1-followerSpeed*0.01));
        followerDirectionSetter(followerDirection);
        followerShadow("0 " + followerSpeed*0.1 + "px " + followerSpeed*0.5 + "px #FEE3EC")
      }
    }
  })
  return (
    <div style={{mixBlendMode:"difference"}} ref={cursor}>
      <div className="cursor" id="pointer"></div>
      <div className="cursor" id="follower"></div>
    </div>
  )
}
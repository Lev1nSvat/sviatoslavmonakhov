import { useEffect, useRef } from "react"
import gsap from "gsap";
import { isMobile } from "react-device-detect";

export default function GsapFollowCursor({containerRef}) {
  let cursor = useRef();
  let q = gsap.utils.selector(cursor);
  useEffect(()=>{
    if(isMobile) return null
    
    //premade tweens for better perfomance 
    let targetRect, isHover = false, deformPause = false, cursorPositionCash = {}, speed, direction = 0,
    opacity = gsap.quickTo(q("div"), "opacity", {}),
    followerWidth = gsap.quickTo(q("#follower"), "width", {ease:"power4"}),
    followerHeight = gsap.quickTo(q("#follower"), "height", {ease:"power4"}),
    pointerX = gsap.quickSetter(q("#pointer"), "x", "px"),
    pointerY = gsap.quickSetter(q("#pointer"), "y", "px"),
    followerX = gsap.quickTo(q("#follower"), "x", {ease: "power4", duration: 1}),
    followerY = gsap.quickTo(q("#follower"), "y", {ease: "power4", duration: 1}),
    followerYPercent = gsap.quickTo(q("#follower"), "yPercent", {ease: "power4", duration: 1}),
    followerXPercent = gsap.quickTo(q("#follower"), "xPercent", {ease: "power4", duration: 1}),
    pointerDirectionSetter = gsap.quickSetter(q("#pointer"), "rotation", "deg"),
    followerDirectionChange = gsap.quickTo(q("#follower"), "rotation", {duration:0.1, ease:"power4"}),
    followerSctretch = gsap.quickTo(q("#follower"), "scaleY", {duration:0.1}),
    followerShrink = gsap.quickTo(q("#follower"), "scaleX", {duration:0.1}),
    followerShadow = gsap.quickSetter(q("#follower"), "boxShadow", ""),
    pointerSctretch = gsap.quickTo(q("#pointer"), "scaleY", {duration:0.05}),
    pointerShrink = gsap.quickTo(q("#pointer"), "scaleX", {duration:0.05})
    
    //styling
    gsap.set(cursor.current, {position:"fixed", pointerEvents:"none", zIndex:9999})
    gsap.set(q("#pointer"), {position:"fixed", xPercent:-50, yPercent:-50,y:"100vh", opacity:0, width:12, height:12, borderRadius: 6, backgroundColor:"#FEE3EC", })
    gsap.set(q("#follower"), {position:"fixed", xPercent:-50, yPercent:-50,x:"50vw",y:"120vh", opacity:0, borderRadius: 36, borderWidth:2, borderColor:"#FEE3EC"})
    
    removeNativeCursor(containerRef)

    //reveal and hide cursor
    document.body.addEventListener("mouseover", () => {
      opacity(1);
      followerHeight(72);
      followerWidth(72);
      setTimeout(()=> deformPause = false, 100)
    })
    
    document.body.addEventListener("mouseleave", () => {
      opacity(0);
      followerHeight(0);
      followerWidth(0);
      followerSctretch(1);
      followerShrink(1);
      deformPause = true;
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
        followerDirectionChange(0);
        followerShrink(1);
        followerSctretch(1);
        followerShadow("none")
        
        //stick it to the box 
        hoverUpdate = setInterval(() => {
          targetRect = a.getBoundingClientRect()
          followerHeight(targetRect.height*1.1);
          followerWidth(targetRect.width*1.1);
          followerX(targetRect.x - targetRect.width*0.05);
          followerY(targetRect.y - targetRect.height*0.05);
        },10)
      })
      
      a.addEventListener('mouseleave',()=> {
        isHover = false
        deformPause = true 
        followerDirectionChange(0)
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
        pointerSctretch(clampValue(1+speed*0.06 ));
        pointerShrink(clampValue(1-speed*0.01));
      }
      //cleanup
      setTimeout(()=>{
        pointerSctretch(1);
        pointerShrink(1);
      },100)
      
      direction&&pointerDirectionSetter(direction);

    }
    let followerDirectionCashe = 0
    function deformFollower() {
      if(!isHover&&!deformPause&&followerSpeed) {
        Math.abs(followerDirectionCashe-followerDirection) > 90 ? followerDirection&&followerDirectionChange(followerDirection, followerDirection) : followerDirection&&followerDirectionChange(followerDirection)
        followerDirectionCashe = followerDirection
        followerSctretch(clampValue(1+followerSpeed*0.04 ));
        followerShrink(clampValue(1-followerSpeed*0.01));
        followerSpeed = gsap.utils.clamp(0,50,followerSpeed)
        followerShadow("0 " + followerSpeed*0.3 + "px " + followerSpeed*0.3 + "px #FEE3EC")
      }
    }

    function removeNativeCursor(containerRef) {
      if(!containerRef) {
        containerRef ={current:document.body}
      }
      gsap.set(containerRef.current, {cursor:"none"})
      gsap.set(gsap.utils.selector(containerRef)('*'), {cursor:"none"})
    }

  })
  return (
    <div id="cursor" style={{mixBlendMode:"difference"}} ref={cursor}>
      <div id="pointer"></div>
      <div id="follower"></div>
    </div>
  )
}
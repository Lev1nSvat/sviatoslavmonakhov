"use client"
import Link from "next/link"
import Image from "next/image"
import ram from '../public/ram.jpg';
import { useEffect, useRef } from "react"
import  LocoProxy  from "../components/LocoProxy"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import {Paytone_One} from "@next/font/google"
const paytoneOne = Paytone_One({
  weight: '400',
  subsets: ['normal'],
})
import dynamic from 'next/dynamic' 
import React from 'react'
const NonSSRWrapper = props => ( 
    <React.Fragment>{props.children}</React.Fragment> 
) 
dynamic(() => Promise.resolve(NonSSRWrapper), { 
    ssr: false 
})
export default function Home() {
  const el = useRef()
  const q = gsap.utils.selector(el);
  useEffect(()=>{
    console.log(paytoneOne)
    const q = gsap.utils.selector(el);
      const intro = gsap.timeline({scrollTrigger: {scrub:true, pin:q('#intro'), end: 4000,}});
      intro.fromTo(q("#intro"),{background: "linear-gradient(to right, #222222 100%, #FEE3EC 100%)"}, {background: "linear-gradient(to right, #222222 0%, #FEE3EC 0%)"}, "<-0.7999")
      intro.from(q('#Sviatoslav'), {letterSpacing: "47vw",attr:{x:"35%"}, left:500, ease: "power4", duration:0.8} , '<')
      intro.fromTo(q("#gr1"),{attr:{offset:0}}, {attr:{offset: 1}}, "<")
      intro.set(q('#surname'), {visibility:'visible'})
      intro.fromTo(q("#surname"), {attr:{x: "70%"}}, {attr:{x:"-130%"}, duration: 1.5,ease:"none"})
      intro.set(q("#scroll"), {display: "none"}, "<")
      intro.to(q("#intro"), {background: "linear-gradient(to left, #222222 200%, #FEE3EC 200%)", ease:"none", duration: 1.5}, "<0.75")
      intro.set(q("#Sviatoslav"), {display: "none"}, ">")
      intro.set(q(".name"), {display: "block"}, ">")
      intro.to(q(".name"), { strokeDasharray: "0% 100%", strokeDashoffset: "50%", duration:2}, ">-1.2")
      intro.to(q("#dev"), { strokeDasharray: "100% 0%", strokeDashoffset: "50%", duration:2}, ">-1")
      intro.set(q(".dev"), { display: "block"}, "<")

      const loading = gsap.timeline()
      loading.fromTo(q('#gr1'), {attr:{offset: "0.63"}}, {attr:{offset: 0.63 - window.innerWidth * 0.113 / window.innerHeight }, duration: 2.5, ease:"power1"})
      loading.set(q('#gr'), {attr:{y1:0.5, y2:0.5,x1:1,x2:0}})
      loading.set(q("#gr1"), {attr:{offset:0}})
      loading.from(q('#scroll'), {y: "+=4vh", opacity: 0,ease:"power1"})
      loading.set('#scrollBlock', {display:"none"}, "<")
      
      const paralax = gsap.timeline({scrollTrigger: {scrub: true, start: "top bottom", end: "bottom top", trigger: q('#main')}});
      paralax.to(q('#dev'), {y: "+=1100", ease: "none"})
      
      const main = gsap.timeline({scrollTrigger: {scrub:true, start:"top bottom", end:"bottom top", trigger:q('#main')}})
      main.to(q('#image'), {y:"+=270vh", ease:"none"})

      const main2 = gsap.timeline({scrollTrigger: {scrub:true, start:"top bottom", end:"bottom bottom", trigger:q('#main2'), pin:q('#about')}})
      main2.from(q('#about'), {top: "-=50%", ease:"none"})

      gsap.utils.toArray(q('.projects')).forEach(a => {
        let hover = gsap.fromTo(a, {backgroundImage: "linear-gradient(to right, #222222 0%, #FEE3EC 0%)"}, {backgroundImage: "linear-gradient(to right, #222222 100%, #FEE3EC 100%)", paused: true, ease: "power2"});
        let hover1 = gsap.to(a, {backgroundImage: "linear-gradient(to right, #222222 100%, #FEE3EC 100%)", paused: true, ease: "power2"});
        a.addEventListener("mouseenter", () => {hover.play();hover1.play()});
        a.addEventListener("mouseleave", () => {hover.reverse();;hover1.reverse()});
      });
      gsap.utils.toArray(q('.skewElem')).forEach(el => {
        gsap.set(el, {transformOrigin: "left center"})
      })  
      gsap.utils.toArray(q('.reveal')).forEach(el => {
        let reveal = gsap.from(el, {y: "+=400", scrollTrigger:{start:"-=400 bottom",end:"0", trigger:el, toggleActions:"play none none reset"}, duration:1.2})
      })  
    
      
        gsap.set("body", {backgroundColor:"#222222"})
        gsap.to(q("#Sviatoslav"), {opacity:1, duration:0.1},"<")

        
  })
  let speed
  let cash = 0;
  function onScroll() {
    let position = document.querySelector("#scroll-section").getBoundingClientRect().top
    speed = cash - position
    if (speed < -50) {
      speed = -50
    }
    if (speed > 50) {
      speed = 50
    }
    cash = position
    console.log(speed)
    gsap.to(".skewElem", {skewY: speed*0.2})
    
  }
  return (
    <>
      <NonSSRWrapper>
      <div id="scrollBlock" className="h-[100vh] w-full absolute z-50"></div>
      <LocoProxy el={el}>
        <div id="intro" className={ paytoneOne.className + " min-h-[100vh] bg-shark-500 bg-gr flex justify-center items-center"}>
          <svg id="svg" className="h-[100vh] w-[100vw] flex justify-center items-center" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask  id="mask">
              <text id="Sviatoslav" className={ paytoneOne.className + " relative opacity-0 text-[16vw] translate-y-[63vh] translate-x-[10vw] h-[16vw] w-[100vw]"} fill="white"  stroke="#FEE3EC">
                <tspan className="">Sviatoslav</tspan>
              </text>
            </mask>
            <rect width="100%" height="100%" className="" fill="url(#gr)" mask="url(#mask)"></rect>  
            <text id="Sviatoslav" strokeDasharray="100% 0%"  strokeDashoffset="0%" className="relative opacity-0 translate-y-[63vh] translate-x-[10vw] name text-[16vw]" fill="none"  stroke="#FEE3EC">
                <tspan className="">Sviatoslav</tspan>
            </text>
            <text id="surname" className="fill-carousel-pink-500 invisible translate-y-[63vh] translate-x-[10vw] text-[16vw]" fill="none" stroke="#FEE3EC">
                <tspan className="">Monakhov</tspan>
            </text>
            <text id="dev" strokeDasharray="0% 100%" className=" text-[16vw]" fill="none"  stroke="#FEE3EC">
                <tspan x="6%" y="40%" className="dev hidden">Interactive</tspan>
                <tspan x="6%" y="70%" className="dev text-[15vw] hidden">Developer</tspan>
            </text>

            <defs>
              <linearGradient id="gr" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop id="gr1" offset="0" stopColor="#222222"/>
                <stop id="gr1" offset="0" stopColor="#FEE3EC"/>
              </linearGradient>
            </defs>
          </svg>
          <p id="scroll" className="text-carousel-pink-500 text-[2vw] absolute translate-y-[40vh]">scroll</p>
        </div>
        <div id="main" className={ paytoneOne.className + " bg-carousel-pink-500 -z-10 relative min-h-[250vh] flex justify-between items-center"}>
          <div className="skewElem z-20 absolute pl-32 mt-6 lg:mt-16 text-[12vw] lg:text-[6vw]">

            <p className="my-32 lg:my-56  h-[17vw] lg:[8vw] projects text-gr w-fit">
              <Link href={"/"}>
                Project1
              </Link>
            </p>
            <p className="my-32 lg:my-56 h-[17vw] lg:[8vw] projects text-gr w-fit ">
              <Link href={"/"}>Project1</Link>
            </p>
            <p className="my-32 lg:my-56 h-[17vw] lg:[8vw] projects text-gr w-fit ">
              <Link href={"/"}>Project1</Link>
            </p>
          </div>
          <div className="skewElemSlow opacity-20 pl-32 mt-6 lg:mt-16 text-[12vw] absolute lg:relative lg:text-[6vw]">

            <p className="my-32 lg:my-56  h-[17vw] lg:[8vw] projects text-gr w-fit">
              <Link href={"/"}>
                Project1
              </Link>
            </p>
            <p className="my-32 lg:my-56 h-[17vw] lg:[8vw] projects text-gr w-fit ">
              <Link href={"/"}>Project1</Link>
            </p>
            <p className="my-32 lg:my-56 h-[17vw] lg:[8vw] projects text-gr w-fit ">
              <Link href={"/"}>Project1</Link>
            </p>
          </div>
          <div id="image" className="self-start -translate-y-[30vh] lg:-translate-y-[70vh] lg:my-[10%] lg:mx-[10%] w-full lg:w-[80%]">
            <Image 
              src={ram}  
            />
          </div>
        </div>
        <div id="main2" className="relative z-30 bg-shark-500 overflow-hidden">
          <p id="about" className={paytoneOne.className + " text-[80vw] lg:text-[33vw] origin-top-left translate-y-[110%] -translate-x-[14%] -rotate-90 w-fit absolute opacity-20 lg:opacity-100 text-carousel-pink-500"}>About</p>
          <div className="w-[90vw] lg:w-[75vw]  lg:ml-[30vw] text-2xl lg:text-5xl py-[30vh] skewElem px-[10vw] text-carousel-pink-500">
            <p className="reveal py-8" >Hi, I'm Sviatoslav Monakhov, Interactive UI/UX developer.</p>
            <p className="reveal py-8" >I'm currently offerring my expertise to agencies and creative teams.</p>
            <p className="reveal py-8" >My love for challenge, makes me seek it in my work every day. Achieving today what wasn't possible for me yestarday is my passion. I hope I will find a team which will provide great oportunity to do so.</p>
            <p className="reveal py-8" >I'm a developer with taste for design, polished animation and big typography :)</p>
            <p className="reveal pt-56" >Feel free to say hello:</p>
            <p className="reveal pb-4 magic-hover" ><a href="mailto:sviatoslavmonakhov@gmail.com">sviatoslavmonakhov@gmail.com</a></p>
            <p className="reveal h-3  bg-carousel-pink-500" ></p>
            <p id="id11" className="reveal pt-6 flex justify-end" ><a href="https://github.com/Lev1nSvat">  
              <svg className="magic-hover fill-carousel-pink-500 h-16 w-16" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px" ><path d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"/></svg>
            </a></p>
          </div>
        </div>
      </LocoProxy>
      </NonSSRWrapper>
    </>
  )
}

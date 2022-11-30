"use client"
import React, { useState } from 'react';
import  { useEffect } from "react"
import * as PIXI from 'pixi.js'
import gsap from "gsap"
import PixiPlugin from "gsap/PixiPlugin"
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default function WatercolorLayout({children}) {
  const [app, setApp] = useState()
  useEffect(()=>{
    let app = new PIXI.Application({
      resizeTo: window,
    })    
    document.body.appendChild(app.view)
    gsap.ticker.add((time, deltaTime, frames)=>{
      app.ticker.update()
    })
    setApp(app)
  },[])
  return (
    <PIXIGSAPcontext.Provider value={{app: app, gsap:gsap}}>
      {children}
    </PIXIGSAPcontext.Provider>
  )
}
export const PIXIGSAPcontext = React.createContext(false);
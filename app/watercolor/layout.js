"use client"
import { useEffect, useContext, Children } from "react"
import * as PIXI from 'pixi.js'
import gsap from "gsap"
import PixiPlugin from "gsap/PixiPlugin"
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default function WatercolorLayout({children}) {
  const PIXIGSAPcontext = React.createContext()
  useEffect(()=>{
    const app = new PIXI.Application({
      resizeTo: window,
    });
    document.body.appendChild(app.view)
    gsap.ticker.add((time, deltaTime, frames)=>{
      app.ticker.update()
    })
  })
  return (
    <PIXIGSAPcontext.Provider value={{PIXI: PIXI, gsap:gsap}}>
      {children}
    </PIXIGSAPcontext.Provider>
  )
}
export { PIXIGSAPcontext };
"use client"
import { PIXIGSAPcontext }  from "./layout.js"
import { Text } from 'pixi.js'
import { useContext, useEffect } from "react"
export default function WatercolorHome() {
  const {app, gsap} = useContext(PIXIGSAPcontext)
  useEffect(()=>{
    if (app) {
      const helloWorld = new Text('Hello world', {fill:"red"})
      app.stage.addChild(helloWorld)
    }
  }, [app])
  return(
  <>

  </>)
}
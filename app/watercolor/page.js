"use client"
import { PIXIGSAPcontext }  from "./layout.js"
import { Sprite, Text, Texture, } from 'pixi.js'
import { useContext, useEffect } from "react"
import guasheLine2 from "../../public/guashe line 2.png"
import heroBg from "../../public/min-hero-bg.png"
import canvas from "../../public/out-canvas.png"
import titleBgGradient from "../../public/titleBgGradient.svg"
import canvasMaskShadow from "../../public/canvasMaskShadow.svg"
export default function WatercolorHome() {
  const {app, gsap} = useContext(PIXIGSAPcontext)
  useEffect(()=>{
    if (app) {
      let bgScale
      const heroBgSprite = Sprite.from(heroBg.src)
      const guasheLIne2Sprite = Sprite.from(guasheLine2.src)
      const titleBgGradientSprite = Sprite.from(titleBgGradient.src)
      const canvasSprite = Sprite.from(canvas.src)
      const canvasMaskShadowSprite = Sprite.from(canvasMaskShadow.src)
      const canvasSprite2 = Sprite.from(canvas.src)
      canvasSprite2.mask = canvasMaskShadowSprite
      titleBgGradientSprite.mask = guasheLIne2Sprite
      const title = new Text("Watercolor", { 
        fontSize:(app.screen.width*0.09),
        fontFamily:"Permanent marker",
        fill:"white"
      })
      canvasSprite.mask = title
      app.stage.addChild(canvasMaskShadowSprite)
      app.stage.addChild(guasheLIne2Sprite)
      app.stage.addChild(heroBgSprite)
      app.stage.addChild(canvasSprite2)
      app.stage.addChild(titleBgGradientSprite)
      app.stage.addChild(canvasSprite)
      function resizeToCenter( sprite ) {
        sprite.anchor.set(0.5)
        sprite.position.set(app.screen.width/2, app.screen.height/2)
      }
      function resizeToCover( sprite ) {
        bgScale = Math.max(app.screen.width/sprite.texture.width, app.screen.height/sprite.texture.height)
        sprite.scale.set(bgScale, bgScale);
        sprite.anchor.set(0.5)
        sprite.position.set(app.screen.width/2, app.screen.height/2)
      }
      function resizeToFillObject( sprite, object ) {
        sprite.width = object.width
        sprite.height = object.height
      }
      app.ticker.stop()
      gsap.ticker.add((time, deltaTime, frames)=>{
        resizeToCover(heroBgSprite)
        resizeToCover(canvasSprite)
        resizeToCover(canvasSprite2)
        resizeToCenter(title)
        resizeToCenter(guasheLIne2Sprite)
        resizeToCenter(titleBgGradientSprite)
        resizeToFillObject(titleBgGradientSprite, guasheLIne2Sprite)
        title.style = {
          fontSize:(app.screen.width*0.09),
          fontFamily:"Permanent marker",
          fill:"white"
        }
        guasheLIne2Sprite.width = app.screen.width * 0.73
        guasheLIne2Sprite.height = app.screen.width * 0.19
        guasheLIne2Sprite.position.set(app.screen.width/2, app.screen.height*0.51)
        titleBgGradientSprite.position.set(app.screen.width/2, app.screen.height*0.51)
        canvasMaskShadowSprite.width = app.screen.width
        canvasMaskShadowSprite.height = app.screen.height
        app.ticker.update()
      })
    }
  }, [app])
  return(<></>)
}
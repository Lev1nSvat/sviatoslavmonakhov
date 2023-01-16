"use client"
import { PIXIGSAPcontext }  from "./layout.js"
import { Sprite, Text, Texture, Graphics, Container } from 'pixi.js'
import { useContext, useEffect } from "react"
import guasheLine2 from "../../public/guashe line 2.png"
import heroBg from "../../public/min-hero-bg.png"
import canvas from "../../public/out-canvas.png"
import titleBgGradient from "../../public/titleBgGradient.svg"
import canvasMaskShadow from "../../public/canvasMaskShadow.svg"
import watercolorSplash from "../../public/watercolor splash low contrast 3.png"
import watercolorSplash0 from "../../public/watercolor splash.png"
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
      const watercolorSplashSprite = Sprite.from(watercolorSplash.src)
      const watercolorSplashSprite2 = Sprite.from(watercolorSplash.src)
      
      const splashColor = new Graphics()
      splashColor.beginFill(0xFFFF00);
      splashColor.drawRect(0, 0, app.screen.width, app.screen.height)
      splashColor.endFill();
      splashColor.mask = watercolorSplashSprite
      
      const splashColor2 = new Graphics()
      splashColor2.beginFill(0x925FFF);
      splashColor2.drawRect(0, 0, app.screen.width, app.screen.height)
      splashColor2.endFill();
      splashColor2.mask = watercolorSplashSprite2
      

      const watercolorSplashSprite0 = Sprite.from(watercolorSplash0.src)
      const splashColor3 = new Graphics()
      splashColor3.beginFill(0x6A015A);
      splashColor3.drawRect(0, 0, app.screen.width, app.screen.height)
      splashColor3.endFill();
      splashColor3.mask = watercolorSplashSprite0
      
      canvasSprite2.mask = canvasMaskShadowSprite
      titleBgGradientSprite.mask = guasheLIne2Sprite
      const title = new Text("Watercolor", { 
        fontSize:(app.screen.width*0.09),
        fontFamily:"Permanent marker",
        fill:"white"
      })
      const scroll = new Text("Scroll", { 
        fontSize:(app.screen.width*0.03),
        fontFamily:"Acme",
        fill:"white"
      })
      const text = new Container()
      text.addChild(title)
      text.addChild(scroll)

      const textSprite = Sprite.from(text.texture)
      app.stage.addChild(watercolorSplashSprite0)
      app.stage.addChild(canvasMaskShadowSprite)
      app.stage.addChild(watercolorSplashSprite)
      app.stage.addChild(watercolorSplashSprite2)
      app.stage.addChild(guasheLIne2Sprite)
      app.stage.addChild(heroBgSprite)
      app.stage.addChild(splashColor)
      app.stage.addChild(splashColor2)
      app.stage.addChild(canvasSprite2)
      app.stage.addChild(splashColor3)
      app.stage.addChild(titleBgGradientSprite)
      app.stage.addChild(textSprite)
      //canvasSprite.mask = text
      //app.stage.addChild(canvasSprite)
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
        text.width = app.screen.width
        text.height = app.screen.height
        splashColor.width = app.screen.width
        splashColor.height = app.screen.height
        splashColor2.widht = app.screen.width
        splashColor2.height = app.screen.height
        watercolorSplashSprite0.anchor.set(0.5,0.5)
        watercolorSplashSprite0.width = app.screen.width*0.27
        watercolorSplashSprite0.height = app.screen.height*0.12
        watercolorSplashSprite0.position.set(app.screen.width/2, app.screen.height*0.8)
        watercolorSplashSprite.anchor.set(0.5,0.5)
        watercolorSplashSprite.width = app.screen.width
        watercolorSplashSprite.height = app.screen.height
        watercolorSplashSprite2.width = app.screen.width
        watercolorSplashSprite2.height = app.screen.height
        watercolorSplashSprite2.anchor.set(0.5,0.5)
        watercolorSplashSprite2.position.set(app.screen.width, app.screen.height)
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
"use client"

//pixi js imports
import { PIXIGSAPcontext }  from "./layout.js"
import { Sprite, Text, Texture, Graphics, Container, Assets } from 'pixi.js'


import { useContext, useEffect } from "react"

//images imports
import guasheLine2 from "../../public/guashe line 2.png"
import heroBg from "../../public/min-hero-bg.png"
import canvas from "../../public/out-canvas.png"
import titleBgGradient from "../../public/titleBgGradient.svg"
import canvasMaskShadow from "../../public/canvasMaskShadow.svg"
import watercolorSplash from "../../public/watercolor splash low contrast 3.png"
import watercolorSplash0 from "../../public/watercolor splash.png"
import watercolorSplash1 from "../../public/watercolor splash low contrast 2.png"


export default function WatercolorHome() {
  const {app, gsap} = useContext(PIXIGSAPcontext)
  useEffect(()=>{
    if (app) {
      //array of functions to run on resize
      let runOnResize = []

      //run all functions in runOnResize when size of the body changes
      new ResizeObserver(()=>{
        runOnResize.forEach((a)=>{
          if (a) a();
        })}).observe(document.body)


      //images into sprites 
      const heroBgSprite = Sprite.from(heroBg.src)
      const guasheLIne2Sprite = Sprite.from(guasheLine2.src)
      const titleBgGradientSprite = Sprite.from(titleBgGradient.src)
      const canvasSprite = Sprite.from(canvas.src)
      const canvasMaskShadowSprite = Sprite.from(canvasMaskShadow.src)
      const canvasSprite2 = Sprite.from(canvas.src)
      const watercolorSplashSprite = Sprite.from(watercolorSplash.src)
      const watercolorSplashSprite2 = Sprite.from(watercolorSplash.src)
      const watercolorSplashSprite0 = Sprite.from(watercolorSplash0.src)
      
      //bg scale for positioning
      let bgScale
      
      //const splash1Sprite = addColoredSlpash(watercolorSplash, 0xFFFF00)
      //function positionSplash1Sprite() {
      //  splash1Sprite.then((sprite)=> sprite.anchor.set(0.5,0.5))
      //}
      //positionSplash1Sprite()
      //runOnResize.push(positionSplash1Sprite)
      
      let position = {position:0}
      gsap.fromTo(position, {position:0}, {position:app.screen.width, repeat:-1, duration:1, ease:"linear"})
      let tint = {tint:"0x00F000"}
      testTrail()
      function testTrail() {
        setInterval((()=> {
          let spr = Sprite.from(watercolorSplash1.src)
          spr.tint = tint.tint
          spr.anchor.set(0.5, 0.5)
          spr.width = 300
          spr.height = 300
          spr.rotation = Math.random()*1000
          spr.position.y = 500
          spr.position.x = position.position
          let tl = gsap.timeline()
          tl.fromTo(spr, {alpha: 0}, {alpha: 0.5,duration: 0.1})
          tl.to(spr, {alpha:0, ease:"power2", duration:1})
          app.stage.addChild(spr)
          console.log(position)
        }), 30)
      }
      
      //addColoredSlpash(watercolorSplash, 0x925FFF)
      //
      //addColoredSlpash(watercolorSplash0, 0x6A015A)
      
      canvasSprite2.mask = canvasMaskShadowSprite
      titleBgGradientSprite.mask = guasheLIne2Sprite 
      
      app.stage.addChild(canvasSprite)
      
      //replace pixi ticker with gsap ticker
      app.ticker.stop()
      gsap.ticker.add((time, deltaTime, frames)=>{
        
        app.ticker.update()
      })
      
      
      //functions
      async function addColoredSlpash(mask, color) {
        const texturePromise = Assets.load(mask.src)
        return texturePromise.then((texture)=>{
          const sprite = Sprite.from(texture)  
          sprite.tint = color        
          app.stage.addChild(sprite)
          app.stage.addChild(rect)
          return sprite
        })
      }

      function rectangleOnWholeScreen(graphicsObject, color) {
        if(color) {
          graphicsObject.beginFill(color);
        }
        graphicsObject.drawRect(0, 0, app.screen.width, app.screen.height)
        if(color) {
          graphicsObject.endFill();
        }
        return graphicsObject
      }
      

      //positioning functions
      function coverScreen( sprite ) {
        bgScale = Math.max(app.screen.width/sprite.texture.width, app.screen.height/sprite.texture.height)
        sprite.scale.set(bgScale, bgScale);
        sprite.anchor.set(0.5)
        sprite.position.set(app.screen.width/2, app.screen.height/2)
        window.addEventListener( 'resize', (sprite) => {
          bgScale = Math.max(app.screen.width/sprite.texture.width, app.screen.height/sprite.texture.height)
          sprite.scale.set(bgScale, bgScale);
          sprite.anchor.set(0.5)
          sprite.position.set(app.screen.width/2, app.screen.height/2)
        })
      }

    }
  }, [app])
  return(<></>)
}


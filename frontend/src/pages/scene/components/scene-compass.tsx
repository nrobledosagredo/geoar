// scene-ompass.tsx
import { useEffect, useState } from "react"

export function SceneCompass() {
  //const [tiltLR, setTiltLR] = useState(0)
  //const [tiltFB, setTiltFB] = useState(0)
  const [direction, setDirection] = useState(0)
  //const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (eventData) => {
        //const gamma = eventData.gamma ?? 0 // Tilting the device from left to right.
        //const beta = eventData.beta ?? 0 // Tilting the device from the front to the back.
        const alpha = eventData.alpha ?? 0 // The direction the compass of the device aims to in degrees.

        //setTiltLR(Math.ceil(gamma))
        //setTiltFB(Math.ceil(beta))

        const offset = 135
        const totalDir = -(alpha + offset)
        setDirection(totalDir)
      })
    } else {
      //setSupported(false)
    }
  }, [])

  return (
    <div>
      <div className="compass relative w-[360px] h-[50px] mx-auto my-[20px] overflow-hidden border border-gray-400">
        <div className="line absolute top-0 z-[1000] bg-[url('https://i.ibb.co/h25K56D/COMPASS-v4.png')] w-[1080px] h-[50px]"></div>
        <div
          className="bg absolute top-0 z-[200] bg-[url('https://i.ibb.co/DfFhkbM/COMPASS-v4.jpg')] bg-no-repeat w-[1080px] h-[50px]"
          style={{ left: `${direction}px` }}
        ></div>
      </div>
      {/*
      <div className="orientation-data text-white">
        <div>Inclinación delantera y trasera: <span>{tiltFB}</span></div>
        <div>Inclinación izquierda y derecha: <span>{tiltLR}</span></div>
        <div>totalDir: <span>{direction}</span></div>
      </div>

      <div id="notice" className="text-white">
        {supported ? "Genial! La API deviceOrientationEvent es compatible!." : "Helaas. De DeviceOrientationEvent API word niet door dit toestel ondersteund."}
      </div>
  */}
    </div>
  )
}

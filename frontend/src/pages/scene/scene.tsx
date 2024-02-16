import { useParams } from "react-router-dom"

export function Scene() {
  const trailId = useParams().id
  return (
    <div>
      <h1>Scene {trailId}</h1>
    </div>
  )
}

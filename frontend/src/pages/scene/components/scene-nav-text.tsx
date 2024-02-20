// scene-nav-text.tsx
export function SceneNavText({ distance }: { distance: string }) {
  return (
    <div className="flex flex-row items-center text-center ml-3 mb-2">
      <span className="text-3xl font-bold"> {distance} </span>
      <span className="text-xl ml-0.5 mb-[-6px]"> m </span>
    </div>
  )
}

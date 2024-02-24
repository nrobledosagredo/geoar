// scene-nav-text.tsx
export function SceneNavText({ distance }: { distance: string }) {
  return (
    <div className="flex flex-row items-center text-center">
      <span className="text-2xl font-medium"> {distance} </span>
      <span className="text-muted-foreground text-md ml-0.5 mb-[-8px]">
        {" "}
        m{" "}
      </span>
    </div>
  )
}

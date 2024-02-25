// scene-nav-text.tsx
export function SceneNavText({ distance }: { distance: string }) {
  return (
    <p className="text-muted-foreground text-sm leading-none tracking-tighter">
      {" "}
      <strong className="text-card-foreground text-2xl">{distance}</strong> m
    </p>
  )
}

import { SceneArrow } from "@/pages/scene/components/scene-arrow"
import { SceneInfoCard } from "@/pages/scene/components/scene-infocard"
import { SceneMap } from "@/pages/scene/components/scene-map"
import { SceneNav } from "@/pages/scene/components/scene-nav"
import { ScenePoint } from "@/pages/scene/components/scene-point"
import { SceneTreeCard } from "@/pages/scene/components/scene-treecard"
import { SceneLoadingScreen } from "@/pages/scene/components/scene-loading-screen"
import { getImage } from "@/services/images-service"
import { useParams } from "react-router-dom"

import { config } from "@/lib/scene-config"
import { useGetInfoCardsByTrail } from "@/hooks/use-get-infocards-by-trail"
import { useGetPoints } from "@/hooks/use-get-points"
import { useGetTrail } from "@/hooks/use-get-trail"
import { useGetTreeCards } from "@/hooks/use-get-treecards"
import { useGetTrees } from "@/hooks/use-get-trees"

import "@/lib/color-changer"
import "@/lib/target-finder"
import "@/lib/distance-displayer"

const simulateLongitude = config.simulateLongitude
const simulateLatitude = config.simulateLatitude
const cameraMaxDistance = config.cameraMaxDistance

export function Scene() {
  const trailId = useParams().id
  const {
    trail,
    loading: trailLoading,
    error: trailError,
  } = useGetTrail(trailId as string)
  const {
    points,
    loading: pointsLoading,
    error: pointsError,
  } = useGetPoints(trailId as string)
  const {
    infoCards,
    loading: infoCardsLoading,
    error: infoCardsError,
  } = useGetInfoCardsByTrail(trail as any)
  const { trees, loading: treesLoading, error: treesError } = useGetTrees()
  const {
    treeCards,
    loading: treeCardsLoading,
    error: treeCardsError,
  } = useGetTreeCards()

  if (
    trailLoading ||
    pointsLoading ||
    infoCardsLoading ||
    treesLoading ||
    treeCardsLoading
  )
  return <SceneLoadingScreen />;

  //TODO: Agregar algún tipo de manejo de errores
  if (
    trailError ||
    pointsError ||
    infoCardsError ||
    treesError ||
    treeCardsError
  )
    return <p>Error</p>

  const treesExtended = trees.map((tree) => {
    const treeCard = treeCards.find((card) => card._id === tree.treeCard)
    return { ...tree, treeCard }
  })

  return (
    <div className="relative bg-opacity-0 h-screen">
      {/* Barra de dirección */}
      <div className="relative z-50">
        <SceneNav />
      </div>

      {/* Mapa */}
      <div className="relative z-50">
        <SceneMap points={points} infoCards={infoCards} trees={trees} />
      </div>

      <a-scene
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse"
        raycaster="objects: .raycastable; near: 0; far: 50000"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true"
        //stats
      >
        <a-camera
          gps-new-camera={`gpsMinDistance: 5; simulateLatitude: ${String(simulateLatitude)}; simulateLongitude: ${String(simulateLongitude)}`}
          target-finder
          far={cameraMaxDistance}
        >
          {/* Flecha 3D que apunta al siguiente punto */}
          <SceneArrow />
        </a-camera>

        {/* Puntos del sendero */}
        {points.map((point, index) => (
          <ScenePoint
            key={index}
            longitude={point.geometry.coordinates[0]}
            latitude={point.geometry.coordinates[1]}
            order={point.order}
          />
        ))}

        {/* infoCards */}
        {infoCards.map((infoCard, index) => (
          <SceneInfoCard
            key={index}
            id={index as any}
            name={infoCard.name}
            description={infoCard.description.replace(/\. /g, ".\n\n")}
            image={`/infocards/${encodeURIComponent(
              Array.isArray(infoCard.images)
                ? infoCard.images[0]
                : infoCard.images
            )}`}
            longitude={infoCard.geometry.coordinates[0]}
            latitude={infoCard.geometry.coordinates[1]}
          />
        ))}

        {/* treeCards */}
        {treesExtended.map((tree, index) => (
          <SceneTreeCard
            key={index}
            name={tree.treeCard?.binomialName ?? ""}
            taxonomy={
              tree.treeCard?.taxonomy ?? {
                kingdom: "",
                division: "",
                class: "",
                order: "",
                family: "",
                genus: "",
                species: "",
              }
            }
            conservationStatus={
              tree.treeCard?.conservationStatus ?? {
                acronym: "",
                description: "",
              }
            }
            image={getImage(
              tree.treeCard?.images ? tree.treeCard.images[0] : ""
            )}
            longitude={tree.geometry.coordinates[0]}
            latitude={tree.geometry.coordinates[1]}
          />
        ))}
      </a-scene>
    </div>
  )
}

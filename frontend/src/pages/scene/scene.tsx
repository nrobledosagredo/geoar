import { Arrow } from "@/pages/scene/components/arrow"
import { InfoCard } from "@/pages/scene/components/infocard"
import { Point } from "@/pages/scene/components/point"
import { TreeCard } from "@/pages/scene/components/treecard"
import { config } from "@/pages/scene/config"
import { getImage } from "@/services/images-service"
import { useParams } from "react-router-dom"

import { useGetInfoCardsByTrail } from "@/hooks/use-get-infocards-by-trail"
import { useGetPoints } from "@/hooks/use-get-points"
import { useGetTrail } from "@/hooks/use-get-trail"
import { useGetTreeCards } from "@/hooks/use-get-treecards"
import { useGetTrees } from "@/hooks/use-get-trees"

import "@/lib/color-changer"
import "@/lib/target-finder"
import "@/lib/distance-displayer"

const SIMULATE_LONGITUDE = config.SIMULATE_LONGITUDE
const SIMULATE_LATITUDE = config.SIMULATE_LATITUDE

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

  //TODO: Agregar pantalla de carga
  if (
    trailLoading ||
    pointsLoading ||
    infoCardsLoading ||
    treesLoading ||
    treeCardsLoading
  )
    return <p>Loading...</p>

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
      <a-scene
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse"
        raycaster="objects: .raycastable; near: 0; far: 50000"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true"
        stats
      >
        <a-camera
          gps-new-camera={`gpsMinDistance: 5; simulateLatitude: ${String(SIMULATE_LATITUDE)}; simulateLongitude: ${String(SIMULATE_LONGITUDE)}`}
          target-finder
          //far={CAMERA_MAX_DISTANCE}
        >
          {/* Flecha 3D que apunta al siguiente punto */}
          <Arrow />
        </a-camera>

        {/* Puntos del sendero */}
        {points.map((point, index) => (
          <Point
            key={index}
            longitude={point.geometry.coordinates[0]}
            latitude={point.geometry.coordinates[1]}
            order={point.order}
          />
        ))}

        {/* infoCards */}
        {infoCards.map((infoCard, index) => (
          <InfoCard
            key={index}
            id={index as any}
            name={infoCard.name}
            description={infoCard.description}
            imageSrc={`/infocards/${encodeURIComponent(
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
          <TreeCard
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
            imageSrc={getImage(
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

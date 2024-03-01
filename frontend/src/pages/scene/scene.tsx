import { useEffect, useState } from "react"
import { SceneArrow } from "@/pages/scene/components/scene-arrow"
import { SceneCompass } from "@/pages/scene/components/scene-compass"
import { SceneInfoCard } from "@/pages/scene/components/scene-infocard"
import { SceneLoadingScreen } from "@/pages/scene/components/scene-loading-screen"
import { SceneMap } from "@/pages/scene/components/scene-map"
import { SceneNav } from "@/pages/scene/components/scene-nav"
import { ScenePoint } from "@/pages/scene/components/scene-point"
import { SceneTreeCard } from "@/pages/scene/components/scene-treecard"
import { getImage } from "@/services/images-service"
import { useParams } from "react-router-dom"

//import { config } from "@/lib/scene-config"
import { useGetInfoCardsByTrail } from "@/hooks/use-get-infocards-by-trail"
import { useGetPoints } from "@/hooks/use-get-points"
import { useGetTrail } from "@/hooks/use-get-trail"
import { useGetTreeCards } from "@/hooks/use-get-treecards"
import { useGetTrees } from "@/hooks/use-get-trees"
import { useToast } from "@/components/ui/use-toast"

import "@/lib/color-changer"
import "@/lib/target-finder"
import "@/lib/distance-displayer"
import "@/lib/ios-orientation-fix"

import { useRequestPermissions } from "@/hooks/use-request-permissions"

//const { simulateLatitude, simulateLongitude } = config
//const { cameraMaxDistance } = config

export function Scene() {
  const { toast } = useToast()
  const permissionsGranted = useRequestPermissions()
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

  const treesExtended = trees.map((tree) => {
    const treeCard = treeCards.find((card) => card._id === tree.treeCard)
    return { ...tree, treeCard }
  })

  const loading =
    trailLoading ||
    pointsLoading ||
    infoCardsLoading ||
    treesLoading ||
    treeCardsLoading

  const error =
    trailError || pointsError || infoCardsError || treesError || treeCardsError

  // Toast con errores
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  // Lógica para ocultar la pantalla de carga cuando la escena esté lista
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  useEffect(() => {
    const hideLoadingScreen = () => {
      setTimeout(() => {
        setShowLoadingScreen(false)
      }, 2000) // Retraso de 1000 milisegundos (1 segundo)
    }
    document.addEventListener("locationStarted", hideLoadingScreen)

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener("locationStarted", hideLoadingScreen)
    }
  }, [])

  return (
    <div className="relative bg-opacity-0 h-screen">
      {/* Renderiza condicionalmente la pantalla de carga */}
      {showLoadingScreen && (
        <div className="absolute top-0 left-0 w-full h-full z-50">
          <SceneLoadingScreen />
        </div>
      )}

      {/* Renderiza condicionalmente la UI y la escena solo cuando los datos estén cargados */}
      {permissionsGranted.geolocation &&
        permissionsGranted.camera &&
        permissionsGranted.orientation &&
        permissionsGranted.motion &&
        !loading &&
        !error && (
          <>
            {/* UI */}
            <div className="relative z-40 pointer-events-none">
              <SceneNav />
              <SceneCompass />
              <SceneMap points={points} infoCards={infoCards} trees={trees} />
            </div>

            {/* Scene */}
            <a-scene
              vr-mode-ui="enabled: false"
              cursor="rayOrigin: mouse"
              raycaster="objects: .raycastable; near: 0; far: 50000"
              arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
              renderer="antialias: true; alpha: true"
              device-orientation-permission-ui="enabled: false"
            >
              <a-camera
                //gps-new-camera={`gpsMinDistance: 5; simulateLatitude: ${String(simulateLatitude)}; simulateLongitude: ${String(simulateLongitude)}`}
                gps-new-camera="gpsMinDistance: 5"
                target-finder
                //ios-orientation-fix
                //far={cameraMaxDistance}
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
                  id={infoCard._id}
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
                  //id={tree.treeCard?._id ?? ""}
                  id={tree._id}
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
          </>
        )}
    </div>
  )
}

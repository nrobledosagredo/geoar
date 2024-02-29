import {
  calculateDistance,
  getWalkingInstruction,
} from "@/lib/get-walking-instruction"
import { config } from "@/lib/scene-config"

const { firstPointThreshold, searchRadius, orderIncrement } = config

function calculateBearing(
  startElement: { dataset: { latitude: string; longitude: string } },
  endElement: { dataset: { latitude: string; longitude: string } }
) {
  if (!startElement || !endElement) return null

  const startCoords = {
    latitude: parseFloat(startElement.dataset.latitude),
    longitude: parseFloat(startElement.dataset.longitude),
  }
  const endCoords = {
    latitude: parseFloat(endElement.dataset.latitude),
    longitude: parseFloat(endElement.dataset.longitude),
  }

  return getWalkingInstruction(
    startCoords.latitude,
    startCoords.longitude,
    endCoords.latitude,
    endCoords.longitude
  )
}

AFRAME.registerComponent("target-finder", {
  init: async function () {
    //this.updateInterval = updateInterval; // Intervalo de actualización la función
    //this.updateIntervalID = null;

    this.points = new Map() // Mapa de puntos cacheados
    this.pointsCached = false // Variable para comprobar si se han cacheado los puntos
    this.lastPointOrder = null // Variable para almacenar el último order de los puntos

    this.firstPointThreshold = firstPointThreshold // Distancia mínima para alcanzar el primer punto
    this.firstPointMessageShown = false // Variable para comprobar si se ha mostrado el mensaje de primer punto
    this.firstPointReached = false // Variable para comprobar si se ha alcanzado el primer punto

    this.searchRadius = searchRadius // Radio de búsqueda de puntos
    this.orderIncrement = orderIncrement // Incremento de order para el siguiente punto
    this.nearestPointOrder = 1 // Variable para almacenar el order del punto más cercano
    this.targetOrder = null // Variable para almacenar el order del punto objetivo
    this.pointsToCheck = [] // Array de puntos cercanos a comprobar

    this.lastBearing = null // Variable para almacenar el último bearing
    this.nextBearing = null // Variable para almacenar el siguiente bearing

    // Esperar a que se cargue el DOM antes de llamar a cachePoints
    //await new Promise((resolve) => setTimeout(resolve, loadingDelay))

    // Cachear los puntos del sendero
    await this.cachePoints()

    // Inicializar la posición del usuario
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.userLatitude = position.coords.latitude
        this.userLongitude = position.coords.longitude
      },
      (error) => {
        console.error("Error obtaining user position:", error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  },

  /*
  play: function () {
    this.updateIntervalID = setInterval(
      this.updateTarget.bind(this),
      this.updateInterval
    );
  },

  pause: function () {
    if (this.updateIntervalID) {
      clearInterval(this.updateIntervalID);
      this.updateIntervalID = null;
    }
  },
  */

  play: function () {
    if (!this.isAnimating) {
      this.isAnimating = true
      this.animate()
    }
  },

  pause: function () {
    this.isAnimating = false
  },

  remove: function () {
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID)
    }
  },

  animate: function () {
    if (!this.isAnimating) return

    this.updateTarget() // Llama a la función que actualiza el objetivo

    // Solicita el siguiente frame para la animación
    requestAnimationFrame(this.animate.bind(this))
  },

  // Función para cachear los puntos
  cachePoints: function () {
    // Si ya hemos cacheado los puntos, no hacemos nada más
    if (this.pointsCached) return

    let maxOrder = 0 // Inicializa una variable para encontrar el valor máximo de 'order'
    document.querySelectorAll("a-sphere[data-order]").forEach((point) => {
      const order = parseInt((point as any).dataset.order, 10)
      this.points.set(order, point)
      if (order > maxOrder) {
        maxOrder = order // Actualiza maxOrder si este 'order' es mayor que el actual maxOrder
      }
    })
    this.lastPointOrder = maxOrder // Establece el último order después de iterar todos los puntos
    this.pointsCached = true
    //console.log("El último punto tiene el order:", this.lastPointOrder)
  },

  // Función para guiar al usuario hacia el primer punto
  firstPointGuide: function () {
    if (this.firstPointReached || !this.userLatitude || !this.userLongitude)
      return

    const firstPoint = this.points.get(1)
    if (!firstPoint) return

    // Obtener las coordenadas del primer punto
    const firstPointLatitude = parseFloat(firstPoint.dataset.latitude)
    const firstPointLongitude = parseFloat(firstPoint.dataset.longitude)

    // Calcular la distancia real entre el usuario y el primer punto
    const distance = calculateDistance(
      this.userLatitude,
      this.userLongitude,
      firstPointLatitude,
      firstPointLongitude
    )

    // Verificar si ya se mostró el mensaje antes de imprimirlo
    if (!this.firstPointMessageShown) {
      //console.log("Camina hacia el inicio del sendero siguiendo la flecha.")
      this.firstPointMessageShown = true // Marcar que el mensaje ha sido mostrado
      document.dispatchEvent(new CustomEvent("trailStarted"))
    }

    // Desencadenar evento de actualización del objetivo solo si es necesario
    document.dispatchEvent(
      new CustomEvent("updateTarget", { detail: { order: 1 } })
    )
    //console.log("El usuario está a", distance, "metros del primer punto.")

    // Verificar si el jugador ha alcanzado el primer punto
    if (distance < this.firstPointThreshold) {
      //console.log("Comienza el sendero.")
      this.firstPointReached = true // Marcar que el primer punto ha sido alcanzado
    }
  },

  // Función para actualizar el target de la flecha 3D
  updateTarget: function () {
    // ------------ Comprobación de si se han cacheado los puntos -------------
    if (!this.pointsCached) return

    // ------------ Comprobación de si se ha llegado al primer punto -------------
    this.firstPointGuide()
    if (!this.firstPointReached) return

    // -------------- Comienza updateTarget ---------------
    if (this.nearestPointOrder !== this.targetOrder) {
      this.pointsToCheck.length = 0

      // -------------- Subarray de puntos para calcular el nearest ---------------
      for (let i = -this.searchRadius; i <= this.searchRadius; i++) {
        let pointOrder = this.nearestPointOrder + i
        if (pointOrder > 0) {
          let point = this.points.get(pointOrder)
          if (point) this.pointsToCheck.push(point)
        }
      }

      this.targetOrder = this.nearestPointOrder // Actualizamos el targetOrder

      // -------------- Actualizamos el target de la flecha 3D ---------------
      if (this.targetOrder + this.orderIncrement <= this.lastPointOrder) {
        document.dispatchEvent(
          new CustomEvent("updateTarget", {
            detail: { order: this.targetOrder + this.orderIncrement },
          })
        )
      }

      // -------------- Comprobación de si se ha llegado al último punto ---------------
      else if (this.nearestPointOrder === this.lastPointOrder) {
        //console.log("Finaliza el sendero.");
        document.dispatchEvent(new CustomEvent("trailEnded"))
        return
      }

      /*
      if (this.nearestPointOrder === this.lastPointOrder) {
        //console.log("Finaliza el sendero.");
        document.dispatchEvent(new CustomEvent("trailEnded"));
        return;
      }
      */

      // -------------- Cálculo de instrucciones ---------------
      let startPointData = this.points.get(this.nearestPointOrder)
      let endPointData = this.points.get(this.nearestPointOrder + 1)

      if (startPointData && endPointData) {
        let [bearing, distance] = calculateBearing(
          startPointData,
          endPointData
        ) as [string, string]
        let totalDistance = +distance
        let nextBearing, nextDistance

        // Bucle para acumular distancia mientras el bearing sea el mismo
        for (let i = 2; bearing !== null; i++) {
          endPointData = this.points.get(this.nearestPointOrder + i)
          // Si no hay más puntos, salimos del bucle
          if (!endPointData) break
          const bearingDistance = calculateBearing(startPointData, endPointData)
          if (bearingDistance !== null) {
            ;[nextBearing, nextDistance] = bearingDistance
          } else {
            break
          }
          // Si el bearing cambia, salimos del bucle
          if (bearing !== nextBearing) break

          // Actualizamos valores
          totalDistance += +nextDistance
          startPointData = endPointData
        }

        // -------------- Si cambia el bearing se envía la instrucción con distancia acumulada ---------------
        if (this.lastBearing !== bearing) {
          //console.log(`Nueva instrucción: Ir hacia ${bearing}, distancia ${totalDistance}`);
          this.lastBearing = bearing

          // Crear el evento personalizado
          document.dispatchEvent(
            new CustomEvent("bearingChanged", {
              detail: { bearing: bearing, distance: totalDistance },
            })
          )

          // Versión B: Actualizar el target al último punto antes de cambiar el bearing
          //document.dispatchEvent(new CustomEvent("updateTarget", {detail: { order: endPointData.dataset.order },}));
        }
      }
    }

    // --------- Cálculo de distancia del punto en el array pointsToCheck más cercano al usuario ----------
    let minDistance = Infinity
    let nearestOrder = null

    this.pointsToCheck.forEach((point: any) => {
      const distance = point.object3D.position.distanceTo(
        this.el.object3D.position
      )
      if (distance < minDistance) {
        minDistance = distance
        nearestOrder = parseInt(point.dataset.order)
      }
    })
    if (nearestOrder !== null && nearestOrder !== this.nearestPointOrder) {
      this.nearestPointOrder = nearestOrder
    }
  },
})

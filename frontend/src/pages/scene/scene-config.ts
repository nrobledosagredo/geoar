// scene-config.ts
export const config = {
  // Scene
  simulateLongitude: -73.25185, // Longitud simulada del usuario (default: -73.25185)
  simulateLatitude: -39.80572, // Latitud simulada del usuario (default: -39.80572)
  cameraMaxDistance: 100, // Rango en metros de visión del usuario (default: 100)
  loadingScreenTimeout: 7000, // Tiempo en ms que se demora en cargar la escena (default: 7000)

  // Points
  cameraHeight: 1.6, // Altura en metros de la cámara (default: 1.6)
  pointIsVisible: true, // Mostrar las esferas 3D en el sendero (default: false)

  // TargetFinder
  loadingDelay: 7000, // Tiempo en ms que se demora en cargar la lógica de navegación (default: 3000)
  firstPointThreshold: 5, // Distancia mínima en metros entre el usuario y el primer punto para comenzar el recorrido (default: 5)
  searchRadius: 5, // Radio de pointsToCheck (default: 5)
  orderIncrement: 4, // Target será el punto más cercano más el valor proporcionado (default: 4)

  // InfoCards y TreeCards
  cardDelay: 500, // Delay en ms para prevenir dobleclick no intencional (default: 1500)
  cardScale: 0.2, // Escala de las fichas (default: 0.2)
  cardYPosition: 13, // Posición Y de las fichas con respecto a la cámara (default: 13)

  // Arrow
  arrowDelay: 3000, // Tiempo en ms que se demora en cargar la flecha 3D para prevenir errores (default: 3000)
  arrowScale: 0.005, // Escala de la flecha 3D (default: 0.005)
  arrowPositionX: 0, // Posición X de la flecha 3D con respecto a la cámara (default: 0)
  arrowPositionY: -0.03, // Posición Y de la flecha 3D con respecto a la cámara (default: -0.03)
  arrowPositionZ: -0.1, // Posición Z de la flecha 3D con respecto a la cámara (default: -0.1)
}

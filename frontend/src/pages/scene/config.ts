export const config = {
  // Parámetros de scene
  // Scene
  SIMULATE_LONGITUDE: -73.25185, // Longitud simulada del usuario (default: -73.25185)
  SIMULATE_LATITUDE: -39.80572, // Latitud simulada del usuario (default: -39.80572)
  CAMERA_MAX_DISTANCE: 100, // Rango en metros de visión del usuario (default: 100)
  LOADING_SCREEN_TIMEOUT: 7000, // Tiempo en ms que se demora en cargar la escena (default: 7000)

  // Points
  CAMERA_HEIGHT: 1.6, // Altura en metros de la cámara (default: 1.6)
  POINT_IS_VISIBLE: false, // Mostrar las esferas 3D en el sendero (default: false)

  // TargetFinder
  LOADING_DELAY: 7000, // Tiempo en ms que se demora en cargar la lógica de navegación (default: 3000)
  FIRST_POINT_THRESHOLD: 5, // Distancia mínima en metros entre el usuario y el primer punto para comenzar el recorrido (default: 5)
  SEARCH_RADIUS: 5, // Radio de pointsToCheck (default: 5)
  ORDER_INCREMENT: 4, // Target será el punto más cercano más el valor proporcionado (default: 4)

  // InfoCards y TreeCards
  CARD_DELAY: 500, // Delay en ms para prevenir dobleclick no intencional (default: 1500)
  CARD_SCALE: 0.2, // Escala de las fichas (default: 0.2)

  // Arrow
  ARROW_DELAY: 3000, // Tiempo en ms que se demora en cargar la flecha 3D para prevenir errores (default: 3000)
  ARROW_SCALE: 0.005, // Escala de la flecha 3D (default: 0.005)
  ARROW_POSITION_X: 0, // Posición X de la flecha 3D con respecto a la cámara (default: 0)
  ARROW_POSITION_Y: -0.03, // Posición Y de la flecha 3D con respecto a la cámara (default: -0.03)
  ARROW_POSITION_Z: -0.1, // Posición Z de la flecha 3D con respecto a la cámara (default: -0.1)
}

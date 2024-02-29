interface ExtendedDeviceOrientationEvent extends Event {
  webkitCompassHeading?: number;
}

AFRAME.registerComponent('ios-orientation-fix', {
  init: function () {
    const cameraEl = this.el.components.camera.camera;

    let initialOrientation: number | null = null;

    // Escucha los eventos de orientación del dispositivo
    window.addEventListener('deviceorientation', (event: ExtendedDeviceOrientationEvent) => {
      // Verifica si el dispositivo es iOS y si el evento tiene la propiedad webkitCompassHeading
      if ('webkitCompassHeading' in event && typeof event.webkitCompassHeading === 'number') {
        if (initialOrientation === null) {
          // Almacena la orientación inicial del dispositivo
          initialOrientation = event.webkitCompassHeading;
        } else {
          // Calcula la diferencia entre la orientación actual y la inicial
          const rotationDiff = event.webkitCompassHeading - initialOrientation;
          // Aplica la corrección a la rotación de la cámara
          cameraEl.rotation.y = THREE.Math.degToRad(rotationDiff);
        }
      }
    });
  }
});

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
        console.log("Es iOS");
        if (initialOrientation === null) {
          // Almacena la orientación inicial del dispositivo
          initialOrientation = event.webkitCompassHeading;
          console.log("Orientación inicial", initialOrientation);
        } else {
          // Calcula la diferencia entre la orientación actual y la inicial
          const rotationDiff = event.webkitCompassHeading - initialOrientation;
          console.log("Diferencia de rotación", rotationDiff);
          // Aplica la corrección a la rotación de la cámara
          cameraEl.setAttribute('rotation', {x: cameraEl.getAttribute('rotation').x, y: THREE.Math.radToDeg(rotationDiff), z: cameraEl.getAttribute('rotation').z});
          console.log("Rotación de la cámara", cameraEl.rotation.y);
        }
      }
    });
  }
});

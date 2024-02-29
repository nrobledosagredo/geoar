AFRAME.registerComponent('ios-orientation-fix', {
    init: function () {
      // Verifica si el dispositivo es iOS
      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !navigator.maxTouchPoints;
  
      if (isIOS) {
        console.log("Es iOS")
        // Espera a que la cámara esté lista
        this.el.addEventListener('loaded', () => {
          var camera = this.el.components.camera.camera;
          var initialOrientation: number | null = null;
  
          // Escucha los eventos de orientación del dispositivo
          window.addEventListener('deviceorientation', (event) => {
            if (initialOrientation === null) {
              // Almacena la orientación inicial del dispositivo
              initialOrientation = event.webkitCompassHeading || event.alpha;
            } else {
              // Calcula la diferencia entre la orientación actual y la inicial
              var rotationDiff = ((event.webkitCompassHeading ?? event.alpha) ?? 0) - (initialOrientation ?? 0);
              // Aplica la corrección a la rotación de la cámara
              camera.rotation.y = THREE.Math.degToRad(rotationDiff);
            }
          });
        });
      }
    }
  });
  
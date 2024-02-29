AFRAME.registerComponent('ios-orientation-fix', {
    init: function () {
      const cameraEl = this.el;
  
      let initialOrientation: number | null = null;
  
      // Escucha los eventos de orientación del dispositivo
      window.addEventListener('deviceorientation', (event) => {
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
            const currentRotation = cameraEl.getAttribute('rotation');
            console.log("Rotación actual de la cámara", currentRotation);
            cameraEl.setAttribute('rotation', {
              x: currentRotation.x,
              y: THREE.Math.radToDeg(rotationDiff),
              z: currentRotation.z
            });
            console.log("Rotación de la cámara", cameraEl.getAttribute('rotation').y);
          }
        }
      });
    }
  });  
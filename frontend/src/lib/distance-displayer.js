// distance-displayer.js
AFRAME.registerComponent("distance-displayer", {
  init: function () {
    this.text = document.createElement("a-troika-text")
    this.text.setAttribute("position", { x: 0, y: 9, z: 0.1 })
    this.text.setAttribute("align", "center")
    this.text.setAttribute("look-at", "[gps-new-camera]")
    this.text.setAttribute("font-size", "4")
    this.text.setAttribute("color", "black")
    this.text.setAttribute("font", "/fonts/Roboto/Roboto-Medium.ttf")
    this.el.appendChild(this.text)
  },
  tick: function () {
    const cameraEl = document.querySelector("[gps-new-camera]")
    if (cameraEl) {
      // Clona la posición para no modificar la posición original del objeto
      let pointPosition = this.el.object3D.position.clone()
      let cameraPosition = cameraEl.object3D.position.clone()

      // Establece la componente 'y' (altitud) a la misma altura para calcular solo la distancia horizontal (x, z)
      pointPosition.y = cameraPosition.y

      // Calcula la distancia horizontal
      const distance = pointPosition.distanceTo(cameraPosition)

      // Actualiza el texto con la distancia horizontal
      this.text.setAttribute("value", `${distance.toFixed(2)} m`)
    }
  },
})

// color-changer.js
AFRAME.registerComponent("color-changer", {
  schema: { type: "color" },

  init: function () {
    this.el.addEventListener("model-loaded", () => {
      const color = new AFRAME.THREE.Color(this.data)
      const mesh = this.el.getObject3D("mesh")
      mesh.traverse((node: any) => {
        if (node.isMesh) {
          node.material.color = color
        }
      })
    })
  },
})

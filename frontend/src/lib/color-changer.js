// color-changer.js
AFRAME.registerComponent('color-changer', {
    schema: { type: 'color' },
  
    init: function () {
      this.el.addEventListener('model-loaded', () => {
        const color = new THREE.Color(this.data);
        const mesh = this.el.getObject3D('mesh');
        mesh.traverse(node => {
          if (node.isMesh) {
            // Aplica el color al material
            node.material.color = color;
          }
        });
      });
    }
  });
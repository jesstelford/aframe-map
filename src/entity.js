const extendDeep = AFRAME.utils.extendDeep;
const meshMixin = AFRAME.primitives.getMeshMixin();

AFRAME.registerPrimitive('a-map', extendDeep({}, meshMixin, {
  defaultComponents: {
    geometry: {
      primitive: 'plane'
    },
    material: {
      color: '#ffffff',
      shader: 'flat',
      side: 'both',
      transparent: true
    },
    ['map']: {}
  },

  mappings: {
    height: 'geometry.height',
    width: 'geometry.width'
  }
}));


// Inspired by https://github.com/flysonic10/aframe-passthrough
const extendDeep = window.AFRAME.utils.extendDeep;
const meshMixin = window.AFRAME.primitives.getMeshMixin();

/**
 * @param aframe {Object} The Aframe instance to register with
 * @param componentName {String} The component name to use
 */
export default function aframeMapComponent(aframe, componentName) {

  window.AFRAME.registerPrimitive(`a-${componentName}`, extendDeep({}, meshMixin, {
    defaultComponents: {
      geometry: {
        primitive: 'plane',
      },
      material: {
        color: '#ffffff',
        shader: 'flat',
        side: 'both',
        transparent: true,
      },
      [componentName]: {},
    },

    mappings: {
      height: 'geometry.height',
      width: 'geometry.width',
    },
  }));

}

import aframeMapComponent from './component';
import aframeMapEntity from './entity';

const COMPONENT_NAME = 'map';

/**
 * @param aframe {Object} The Aframe instance to register with. Default:
 * `window.AFRAME`
 * @param componentName {String} The component name to use. Default: 'map'
 */
export default function registerAframeMap(
  aframe = window.AFRAME,
  componentName = COMPONENT_NAME
) {
  aframeMapComponent(aframe, componentName);
  aframeMapEntity(aframe, componentName);
}

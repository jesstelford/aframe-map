import cuid from 'cuid';
import mapboxGL from 'mapbox-gl';

const mapStyle = require('./map-style.json');

function getCanvasContainerAssetElement(id, width, height) {

  let element = document.querySelector(`#${id}`);

  if (!element) {
    element = document.createElement('div');
  }

  element.setAttribute('id', id);
  element.style.width = width;
  element.style.height = height;

  // This is necessary because mapbox-gl uses the offsetWidth/Height of the
  // container element to calculate the canvas size.  But those values are 0 if
  // the element (or its parent) are hidden. `position: fixed` means it can be
  // calculated correctly.
  element.style.position = 'fixed';
  element.style.left = '999999px';

  if (!document.body.contains(element)) {
    document.body.appendChild(element);
  }

  return element;
}

function processMapboxCanvasElement(mapboxInstance, canvasContainer) {
  const canvas = canvasContainer.querySelector('canvas');
  canvas.setAttribute('id', cuid());
  canvas.setAttribute('crossorigin', 'anonymous');
}

function createMap(canvasId, width, height, done) {

  const canvasContainer = getCanvasContainerAssetElement(canvasId, width, height);

  // eslint-disable-next-line no-new
  const mapboxInstance = new mapboxGL.Map({
    container: canvasContainer,
    style: mapStyle,
  });

  if (!mapboxInstance.loaded()) {
    mapboxInstance.once('load', _ => {
      mapboxInstance.resize();
      processMapboxCanvasElement(mapboxInstance, canvasContainer);
      done();
    });
  } else {
    mapboxInstance.resize();
    processMapboxCanvasElement(mapboxInstance, canvasContainer);
    done();
  }
}

/**
 * @param aframe {Object} The Aframe instance to register with
 * @param componentName {String} The component name to use. Default: 'map'
 */
export default function aframeMapComponent(aframe, componentName) {

  /**
   * Map component for A-Frame.
   */
  aframe.registerComponent(componentName, {

    dependencies: [
      'geometry',
    ],

    schema: {
      /**
       * @param {<type>} [<name>=<value>] - <description>.
       */
      pxToWorldRatio: {default: 100},
    },

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init() {
      const geomComponent = this.el.components.geometry;
      const width = geomComponent.data.width * this.data.pxToWorldRatio;
      const height = geomComponent.data.height * this.data.pxToWorldRatio;
      this._canvasContainerId = cuid();
      createMap(this._canvasContainerId, width, height, _ => {
        const canvasId = document.querySelector(`#${this._canvasContainerId} canvas`).getAttribute('id');
        // Pointing this aframe entity to that canvas as its source
        this.el.setAttribute('src', `#${canvasId}`);
      });
    },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update() {
    },

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove() {
    },

    /**
     * Called when entity pauses.
     * Use to stop or remove any dynamic or background behavior such as events.
     */
    pause() {
    },

    /**
     * Called when entity resumes.
     * Use to continue or add any dynamic or background behavior such as events.
     */
    play() {
    },
  });
}

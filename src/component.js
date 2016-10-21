import cuid from 'cuid';

const mapboxGL = require('mapbox-gl');

const defaultMapStyle = require('./map-style.json');

const MAP_LOADED_EVENT = 'map-loaded';

function parseSpacedFloats(value, count, attributeName) {

  if (!value) {
    return undefined;
  }

  let values = value;

  if (Object.prototype.toString.call(value) === '[object String]') {
    values = value.split(' ');
  }

  if (values.length !== count) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `Unable to parse value of ${attributeName}: ${value}.`
          + ` Expected exactly ${count} space separated floats.`
      );
    }
    return undefined;
  }

  if (values.some(num => isNaN(parseFloat(num)))) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        `Unable to parse value of ${attributeName}: ${value}. `
          + 'Expected values to be floats.'
      );
    }
    return undefined;
  }

  return values;
}

function setDimensions(aframe, id, el, width, height) {

  const element = document.querySelector(`#${id}`);
  element.style.width = width;
  element.style.height = height;

  aframe.utils.entity.setComponentProperty(el, 'material.width', width);
  aframe.utils.entity.setComponentProperty(el, 'material.height', height);

}

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
  element.style.left = '99999px';
  element.style.top = '0';

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

function createMap(canvasId, options, done) {

  const canvasContainer = getCanvasContainerAssetElement(canvasId, options.width, options.height);

  // eslint-disable-next-line no-new
  const mapboxInstance = new mapboxGL.Map(Object.assign({
    container: canvasContainer,
  }, options));

  if (!mapboxInstance.loaded()) {
    mapboxInstance.once('load', _ => {
      mapboxInstance.resize();
      processMapboxCanvasElement(mapboxInstance, canvasContainer);
      done(mapboxInstance);
    });
  } else {
    mapboxInstance.resize();
    processMapboxCanvasElement(mapboxInstance, canvasContainer);
    done(mapboxInstance);
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
      'material',
    ],

    schema: {
      /**
       * @param {number} [pxToWorldRatio=100] - The number of pixels per world
       * unit to render the map on the plane. ie; when set to 100, will display
       * 100 pixels per 1 meter in world space.
       */
      pxToWorldRatio: {default: 100},

      /**
       * @param {string} [style=''] - A URL to a [MapBox
       * style](https://mapbox.com/mapbox-gl-style-spec/). If none is provided,
       * a default style will be loaded.
       */
      style: {default: ''},

      /**
       * @param {int} [minZoom=0] - The minimum zoom level of the map (0-20). (0
       * is furthest out)
       */
      minZoom: {default: 0},

      /**
       * @param {int} [maxZoom=20] - The maximum zoom level of the map (0-20). (0
       * is furthest out)
       */
      maxZoom: {default: 20},

      /**
       * @param {int} [bearinSnap=7] - The threshold, measured in degrees, that
       * determines when the map's bearing (rotation) will snap to north. For
       * example, with a  bearingSnap of 7, if the user rotates the map within 7
       * degrees of north, the map will automatically snap to exact north.
       */
      bearingSnap: {default: 7},

      /**
       * @param {array} [maxBounds=undefined] - If set, the map will be
       * constrained to the given bounds. Bounds are specified as 4 space
       * delimited floats. The first pair represent the south-west long/lat, the
       * second pair represent the north-east long/lat.
       */
      maxBounds: {
        default: undefined,
        type: 'array',
        parse: value => {

          const values = parseSpacedFloats(value, 4, 'maxBounds');

          if (!values) {
            return undefined;
          }

          return [[values[0], values[1]], [values[2], values[3]]];
        },
      },

      /**
       * @param {array} [center=[0, 0]] - The inital geographical centerpoint of
       * the map in long/lat order. If center is not specified in the
       * constructor options, Mapbox GL JS will look for it in the map's style
       * object. If it is not specified in the style, either, it will default to
       * [0, 0]. Represented as 2 space separated floats.
       */
      center: {
        default: [0, 0],
        type: 'array',
        parse: value => {

          const values = parseSpacedFloats(value, 2, 'center');

          if (!values) {
            return [0, 0];
          }

          return values;
        },
      },

      /**
       * @param {int} [zoom=0] - The initial zoom level of the map. If  zoom
       * is not specified in the constructor options, Mapbox GL JS will look for
       * it in the map's style object. If it is not specified in the style,
       * either, it will default to 0 .
       */
      zoom: {default: 0},

      /**
       * @param {float} [bearing=0] - The initial bearing (rotation) of the map,
       * measured in degrees counter-clockwise from north. If  bearing is not
       * specified in the constructor options, Mapbox GL JS will look for it in
       * the map's style object. If it is not specified in the style, either, it
       * will default to 0.
       */
      bearing: {default: 0.0},

      /**
       * @param {float} [pitch=0] - The initial pitch (tilt) of the map,
       * measured in degrees away from the plane of the screen (0-60). If  pitch
       * is not specified in the constructor options, Mapbox GL JS will look for
       * it in the map's style object. If it is not specified in the style,
       * either, it will default to  0 .
       */
      pitch: {default: 0.0},

      /**
       * All other MapBox GL options are disabled
       */
    },

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init() {

      const geomComponent = this.el.components.geometry;

      const options = Object.assign(
        {},
        this.data,
        {
          style: this.data.style ? this.data.style : defaultMapStyle,
          width: geomComponent.data.width * this.data.pxToWorldRatio,
          height: geomComponent.data.height * this.data.pxToWorldRatio,
          // Required to ensure the canvas can be used as a texture
          preserveDrawingBuffer: true,
          hash: false,
          interactive: false,
          attributionControl: false,
          scrollZoom: false,
          boxZoom: false,
          dragRotate: false,
          dragPan: false,
          keyboard: false,
          doubleClickZoom: false,
          touchZoomRotate: false,
          trackResize: false,
        }
      );

      this._canvasContainerId = cuid();

      aframe.utils.entity.setComponentProperty(this.el, 'material.width', options.width);
      aframe.utils.entity.setComponentProperty(this.el, 'material.height', options.height);

      createMap(this._canvasContainerId, options, mapInstance => {

        this._mapInstance = mapInstance;

        const canvasId = document.querySelector(`#${this._canvasContainerId} canvas`).id;

        // Pointing this aframe entity to that canvas as its source
        this.el.setAttribute('src', `#${canvasId}`);

        this.el.emit(MAP_LOADED_EVENT);
      });
    },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update(oldData) {

      // Nothing changed
      if (aframe.utils.deepEqual(oldData, this.data)) {
        return;
      }

      if (oldData.pxToWorldRatio !== this.data.pxToWorldRatio) {
        const geomComponent = this.el.components.geometry;
        const width = geomComponent.data.width * this.data.pxToWorldRatio;
        const height = geomComponent.data.height * this.data.pxToWorldRatio;
        setDimensions(aframe, this._canvasContainerId, this.el, width, height);
      }

      // Everything after this requires a map instance
      if (!this._mapInstance) {
        return;
      }

      if (oldData.style !== this.data.style) {
        this._mapInstance.setStyle(this.data.style);
      }

      if (oldData.minZoom !== this.data.minZoom) {
        this._mapInstance.setMinZoom(this.data.minZoom);
      }

      if (oldData.maxZoom !== this.data.maxZoom) {
        this._mapInstance.setmaxZoom(this.data.maxZoom);
      }

      if (oldData.maxBounds !== this.data.maxBounds) {
        this._mapInstance.setmaxBounds(this.data.maxBounds);
      }

      // NOTE: Order is important! Zoom must come before center
      if (oldData.zoom !== this.data.zoom) {
        this._mapInstance.setZoom(this.data.zoom);
      }

      if (oldData.center !== this.data.center) {
        this._mapInstance.setCenter(this.data.center);
      }

      if (oldData.bearing !== this.data.bearing) {
        this._mapInstance.setBearing(this.data.bearing);
      }

      if (oldData.pitch !== this.data.pitch) {
        this._mapInstance.setPitch(this.data.pitch);
      }

    },

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove() {
      // TODO: Kill the map
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

    /**
     * Returns {x, y} representing a position relative to the entity's center,
     * that correspond to the specified geographical location.
     *
     * @param {float} long
     * @param {float} lat
     */
    project(long, lat) {

      // The position (origin at top-left corner) in pixel space
      const {x: pxX, y: pxY} = this._mapInstance.project([long, lat]);

      // The 3D world size of the entity
      const {width: elWidth, height: elHeight} = this.el.components.geometry.data;

      return {
        x: (pxX / this.data.pxToWorldRatio) - (elWidth / 2),
        y: (pxY / this.data.pxToWorldRatio) - (elHeight / 2),
        z: 0,
      };

    },

    unproject(x, y) {

      // The 3D world size of the entity
      const {width: elWidth, height: elHeight} = this.el.components.geometry.data;

      // Converting back to pixel space
      const pxX = (x + (elWidth / 2)) * this.data.pxToWorldRatio;
      const pxY = (y + (elHeight / 2)) * this.data.pxToWorldRatio;

      // Return the long / lat of that pixel on the map
      return this._mapInstance.unproject([pxX, pxY]).toArray();
    },
  });
}

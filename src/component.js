/**
 * @param aframe {Object} The Aframe instance to register with
 * @param componentName {String} The component name to use. Default: 'map'
 */
export default function aframeMapComponent(aframe, componentName) {

  /**
   * Map component for A-Frame.
   */
  aframe.registerComponent(componentName, {
    schema: {
      /*
       * @param {<type>} [<name>=<value>] - <description>.
       */
      deviceId: {default: null},
    },

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init() {
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

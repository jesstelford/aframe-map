# aframe-map

A 3D street map entity & component for [A-Frame](https://aframe.io).

The `<a-map>` entity displays a plane textured with a rendered OpenStreetMap
map.

### Installation

#### Browser

Use directly from the unpkg CDN:

```html
<head>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-map"></script>
  <script>
    registerAframeMap(window.AFRAME);
  </script>
</head>

<body>
  <a-scene>
    <a-map position="0 0 -5"></a-map>
    <a-camera></a-camera>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-map
```

Then register and use.

```javascript
import aframe from 'aframe';
import registerMap from 'aframe-map';
registerMap(aframe);
```

### `map` component

_Note: The `<a-map>` entity automatically includes the
`map` component._

#### Schema

| attribute | type | default | description |
|---|---|---|---|
| pxToWorldRatio | number | 100 | The number of pixels per world unit to render the map on the plane. ie; when set to 100, will display 100 pixels per 1 meter in world space. (see [a note on fidelity](#a-note-on-fidelity)) |
| style | string | '' | A `JSON.stringify`'d [MapBox style](https://mapbox.com/mapbox-gl-style-spec/). If none is provided, a default style will be loaded. (see [creating a style](#creating-a-style)) |
| ... | | | All other options are passed directly to Mapbox GL |

##### A note on fidelity

This higher `pxToWorldRatio`, the more map area will be displayed per world
unit. That canvas has to be translated into a plane in world space. This is
combined with the width and height in world space (from geometry.width and
geometry.height on the entity) to set up the plane for rendering in 3D.

The map is rendered as a texture on a 3D plane. For best performance, texture
sizes should be kept to powers of 2. Keeping this in mind, you should work to
ensure `width * pxToWorldRatio` and `height * pxToWorldRatio` are powers of 2.

##### Creating a style

[MapBox styles](https://mapbox.com/mapbox-gl-style-spec/) are a JSON
specification for how to render different layers of the map.

Creating new styles can be done by hand, or with an editor such as
[Maputnik](https://github.com/maputnik/editor).
Take special note of the _tile server_ to be used;
Mapbox charges for access to theirs,
however there is a [free CDN](http://osm2vectortiles.tileserver.com/v2.json)
powered by [osm2vectortiles.org/](http://osm2vectortiles.org) (this is the
server used by the default style).

_Note: The osm2vectortiles free CDN defaults to insecure http URLs which will be
rejected by browsers on security grounds when the main site is served over
secure https._

You can also easily [host your own tile
server](http://osm2vectortiles.org/docs/getting-started/)!

#### Events

| event name | data | description |
|---|---|---|
| `map-loaded` | (none) | Fired on the first render of the map component |
| `map-moveend` | (none) | Fired when zoom, center, bearing, or pitch are changed _after_ the initial render |

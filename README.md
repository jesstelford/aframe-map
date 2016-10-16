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
  <script src="https://unpkg.com/webrtc-adapter/out/adapter.js"></script>
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

#### Events

| event name | data | description |
|---|---|---|

# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [2.1.1][] - 2016-11-24

### Fixed

- Only set the center value when it's actually changed

## [2.1.0][] - 2016-11-24

### Added

- Fire `map-moveend` event when zoom, center, bearing, or pitch are changed
  _after_ the initial render

### Fixed

- Latest mapbox-gl-js dependency which comes with performance enhancements and
  bug fixes.

## [2.0.6][] - 2016-11-23

### Fixed

- Correct projection between world and pixel coordinates

## [2.0.5][] - 2016-11-22

### Fixed

- Changing styles works correctly.

## [2.0.4][] - 2016-11-21

### Fixed

- Pixel to world ratio is now correctly calculated

## [2.0.3][] - 2016-11-9

### Fixed

- Included missing default `map-style.json`

## [2.0.2][] - 2016-10-23

- Fix changelog enforcement script

## [2.0.1][] - 2016-10-23

- Use changelog enforcement tooling

## [2.0.0][]
### Added

- Added a Points Of Interest example powered by Foursquare's venues API.

### Fixed

- Fixed a bug where the center would be randomly innacurate
  when setting zoom after setting center,
  depending on the width & height of the map.

## [1.0.0] - 2016-10-18

Initial release 🎉

A real-time street map component for
[AframeVR](http://aframe.io)
powered by [MapBox GL](https://github.com/mapbox/mapbox-gl-js)
and [osm2vectortiles](osm2vectortiles.org).

[Unreleased]: https://github.com/jesstelford/aframe-map/compare/v2.1.1...HEAD
[2.1.1]: https://github.com/jesstelford/aframe-map/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/jesstelford/aframe-map/compare/v2.0.6...v2.1.0
[2.0.6]: https://github.com/jesstelford/aframe-map/compare/v2.0.5...v2.0.6
[2.0.5]: https://github.com/jesstelford/aframe-map/compare/v2.0.4...v2.0.5
[2.0.4]: https://github.com/jesstelford/aframe-map/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/jesstelford/aframe-map/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/jesstelford/aframe-map/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/jesstelford/aframe-map/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/jesstelford/aframe-map/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/jesstelford/aframe-map/tree/v1.0.0

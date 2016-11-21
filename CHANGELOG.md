# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

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

[Unreleased]: https://github.com/jesstelford/aframe-map/compare/v2.0.3...HEAD
[2.0.3]: https://github.com/jesstelford/aframe-map/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/jesstelford/aframe-map/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/jesstelford/aframe-map/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/jesstelford/aframe-map/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/jesstelford/aframe-map/tree/v1.0.0

import aframe from 'aframe';
import extras from 'aframe-extras';
import keyboardControls from 'aframe-keyboard-controls';
import registerMap from '../src/index';

extras.physics.registerAll(aframe);
aframe.registerComponent('keyboard-controls', keyboardControls);
registerMap(aframe);

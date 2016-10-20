import aframe from 'aframe';
import keyboardControls from 'aframe-keyboard-controls';
import registerMap from '../src/index';

aframe.registerComponent('keyboard-controls', keyboardControls);
registerMap(aframe);

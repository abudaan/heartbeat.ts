// import { Store } from "./Store";

// // temp initialize heartbeat

// const s = new Store();
// const getSong = s.getSong
// const getTrack = s.getTrack
// const getPart = s.getPart

// export {
//   getSong,
//   getTrack,
//   getPart,
// }

import { Song } from './classes/Song';
import { Track } from './classes/Track';
import { Part } from './classes/Part';
import { MIDIEvent } from './classes/MIDIEvent';
import { midiSystem } from './util/midi-system';

let webaudioUnlocked = false;
const audioContext = new AudioContext();

const sequencer = {
  init: async () => {
    const m = await midiSystem.init();
  },
  getPorts: midiSystem.getPorts,
  audioContext,
  unlockWebAudio: function () {
    console.log('unlock webaudio');
    if (webaudioUnlocked === true) {
      console.log('already unlocked');
      return;
    }
    audioContext.resume();
    webaudioUnlocked = true;
  }
}


export {
  sequencer,
  Song,
  Track,
  Part,
  MIDIEvent,
}
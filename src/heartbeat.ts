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

import { midiSystem } from './util/midi-system';

const sequencer = {
  init: async () => {
    const m = await midiSystem.init();
    console.log(m);
  },
  getPorts: midiSystem.getPorts,
}

import { Song } from './classes/Song';
import { Track } from './classes/Track';
import { Part } from './classes/Part';
import { MIDIEvent } from './classes/MIDIEvent';


export {
  sequencer,
  Song,
  Track,
  Part,
  MIDIEvent,
}
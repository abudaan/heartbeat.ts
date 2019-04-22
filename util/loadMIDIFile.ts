import { parseMidiFile, MidiEvent } from 'jasmid.ts';
// import MIDIFile from 'midifile';
import { status } from './fetch-helpers'

export type MidiJSON = {
  header: {
    formatType: number,
    trackCount: number,
    ticksPerBeat: number,
  },
  tracks: MidiEvent[][]
};

export type MIDIEvent = {
  data1: number,
  data2: number,
  type: number
}

async function loadMIDIFile(url: string) {
  return fetch(url)
    .then(status)
    .then(async (response: Response) => {
      const data: ArrayBuffer = await response.arrayBuffer();
      const midi: MidiJSON = parseMidiFile(data);
      const events: MIDIEvent[] = [];
      return midi;
    })
}

export default loadMIDIFile;

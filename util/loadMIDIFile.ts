import {parseMidiFile, MidiEvent} from 'jasmid.ts';
// import MIDIFile from 'midifile';
import {status} from './fetch-helpers'

export type MidiJSON = {
  header: {
    formatType: number,
    trackCount: number,
    ticksPerBeat: number,
  },
  tracks: MidiEvent[][]
};

async function loadMIDIFile (url:string) {
  return fetch(url)
  .then(status)
  .then(async(response:Response) => {
    const data: ArrayBuffer = await response.arrayBuffer();
    const midi: MidiJSON = parseMidiFile(data);
    return midi;
  })
}

export default loadMIDIFile;

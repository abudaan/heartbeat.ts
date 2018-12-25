import {parseMidiFile} from 'jasmid.ts';
// import MIDIFile from 'midifile';
import {status, arrayBuffer} from './util/fetch-helpers'


async function loadMIDIFile (url:string) {
  return fetch(url)
  .then(status)
  .then(arrayBuffer)
  .then(data => {
    return parseMidiFile(data);
  })
}

export default loadMIDIFile;

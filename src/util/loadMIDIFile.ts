import { parseMidiFile } from 'jasmid.ts';
import { JasmidParsedMIDIFile } from '../types';
import { status } from './fetch-helpers'

async function loadMIDIFile(url: string): Promise<JasmidParsedMIDIFile> {
  return fetch(url)
    .then(status)
    .then(async (response: Response) => {
      const data: ArrayBuffer = await response.arrayBuffer();
      const midi: JasmidParsedMIDIFile = parseMidiFile(data);
      // const events: MIDIEvent[] = [];
      return midi;
    })
}

export default loadMIDIFile;

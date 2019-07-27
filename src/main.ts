import loadMIDIFile from './util/loadMIDIFile';
import { JasmidParsedMIDIFile } from './types';
import { eventsToAbsoluteTicks } from './util/event-helpers';
import { Part } from './classes/Part';

loadMIDIFile('./data/minute_waltz.mid')
  .then((data: JasmidParsedMIDIFile) => {
    console.log(data);
    const p = new Part();
    // data.tracks.forEach((t) => {
    //   console.log(eventsToAbsoluteTicks(t));
    // })
  })
  .catch((e: Error) => console.error(e));
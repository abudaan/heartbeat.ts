import loadMIDIFile from './util/loadMIDIFile';
import { JasmidParsedMIDIFile } from './types';
import { eventsToAbsoluteTicks } from './util/event-helpers';

loadMIDIFile('./data/minute_waltz.mid')
  .then((data: JasmidParsedMIDIFile) => {
    console.log(data);
    data.tracks.forEach((t) => {
      console.log(eventsToAbsoluteTicks(t));
    })
  })
  .catch((e: Error) => console.error(e));
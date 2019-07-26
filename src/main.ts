import loadMIDIFile from './util/loadMIDIFile';
import { JasmidParsedMIDIFile } from './types';
import { events_to_absolute_ticks } from './util/event-helpers';

loadMIDIFile('./data/minute_waltz.mid')
  .then((data: JasmidParsedMIDIFile) => {
    console.log(data);
    data.tracks.forEach((t) => {
      console.log(events_to_absolute_ticks(t));
    })
  })
  .catch((e: Error) => console.error(e));
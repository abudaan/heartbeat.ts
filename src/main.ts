import loadMIDIFile from './util/loadMIDIFile';
import { JasmidParsedMIDIFile } from './types';
import { eventsToAbsoluteTicks } from './util/event-helpers';
import { Part } from './classes/Part';
import { Track } from './classes/Track';
import { Song } from './classes/Song';

// loadMIDIFile('./data/minute_waltz.mid')
loadMIDIFile('./data/mozk545a.mid')
  .then((data: JasmidParsedMIDIFile) => {
    console.log(data);
    const tracks = [];
    data.tracks.forEach((track) => {
      const p = new Part(null, eventsToAbsoluteTicks(track));
      const t = new Track();
      t.addParts([p])
      tracks.push(t);
    });
    const s = new Song({
      ppq: data.header.ticksPerBeat,
    });
    s.addTracks(tracks);
    s.update();
    console.log(s.needsUpdate, s.events);
  })
  .catch((e: Error) => console.error(e));
import 'jzz';

import loadMIDIFile from './util/loadMIDIFile';
import { JasmidParsedMIDIFile } from './types';
import { eventsToAbsoluteTicks } from './util/event-helpers';
import { Song, Track, Part, MIDIEvent, sequencer } from './heartbeat';

const main = async () => {
  try {
    await sequencer.init();
    const ports = sequencer.getPorts();
    console.log(ports);
  } catch (e) {
    console.error(e);
  }

  // const data = await loadMIDIFile('./data/minute_waltz.mid');
  const data = await loadMIDIFile('./data/mozk545a.mid');
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
}

main();


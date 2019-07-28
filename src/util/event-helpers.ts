import { JasmidMIDIEvent } from '../types';
import { MIDIEvent } from '../classes/MIDIEvent';

const eventsToAbsoluteTicks = (events: JasmidMIDIEvent[]): MIDIEvent[] => {
  let tick = 0;
  const result = [];
  events.forEach((e: JasmidMIDIEvent) => {
    tick += e.deltaTime;
    // console.log(tick);
    if (e.type === 'midi') {
      if (e.subType === 'noteOff') {
        // console.log('noteOff', e.typeByte);
        const m = new MIDIEvent(0x80, tick, [e.note, e.velocity]);
        result.push(m);
      } else if (e.subType === 'noteOn') {
        // console.log('noteOn', e.velocity);
        const m = new MIDIEvent(0x90, tick, [e.note, e.velocity]);
        result.push(m);
      }
    } else if (e.type === 'meta') {
      if (e.subType === 'setTempo') {
        const bpm = 60000000 / (e as any).microsecondsPerBeat;
        const m = new MIDIEvent(0x51, tick, [bpm]);
        result.push(m);
      } else if (e.subType === 'timeSignature') {
        const m = new MIDIEvent(0x58, tick, [(e as any).numerator, (e as any).denominator, (e as any).metronome, (e as any).thirtySeconds]);
        result.push(m);
      } else if (typeof e.subType === 'undefined') {
        console.log(e);
      }
    }
  })
  return result;
}

const sortEvents = (events: MIDIEvent[]): MIDIEvent[] => {
  return events;
}


const ticksToMillis = (events: MIDIEvent[], ppq: number, playbackSpeed: number = 1): MIDIEvent[] => {
  let ticks = 0;
  let millis = 0;
  let bpm = 120;
  let secondsPerTick = (1 / playbackSpeed * 60) / bpm / ppq;
  let millisPerTick = secondsPerTick * 1000;

  let ts = performance.now();

  const l = events.length;
  for (let i = 0; i < l; i++) {
    const e = events[i]
    ticks = e.ticks;
    e.millis = ticks * millisPerTick;

    if (e.type === 0x51) {
      bpm = e.data[0];
      secondsPerTick = (1 / playbackSpeed * 60) / bpm / ppq;
      millisPerTick = secondsPerTick * 1000;
    }
  };

  console.log('took1', performance.now() - ts);




  ts = performance.now();

  events.forEach(e => {
    ticks = e.ticks;
    e.millis = ticks * millisPerTick;

    if (e.type === 0x51) {
      bpm = e.data[0];
      secondsPerTick = (1 / playbackSpeed * 60) / bpm / ppq;
      millisPerTick = secondsPerTick * 1000;
    }
  })

  console.log('took2', performance.now() - ts);

  return events;
}

export {
  eventsToAbsoluteTicks,
  sortEvents,
  ticksToMillis,
};

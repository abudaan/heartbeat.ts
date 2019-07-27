import { JasmidMIDIEvent, TypeMIDIEvent } from '../types';
import { MIDIEvent } from '../classes/MIDIEvent';
import { MidiEvent } from '../types';

const eventsToAbsoluteTicks = (events: JasmidMIDIEvent[]): TypeMIDIEvent[] => {
  let tick = 0;
  const result = [];
  events.forEach((e: MidiEvent) => {
    tick += e.deltaTime;
    // console.log(tick);
    if (e.type === 'midi') {
      if (e.subType === 'noteOff') {
        // console.log('noteOff', e.typeByte);
        const m = new MIDIEvent(0x80, tick, [e.note, e.velocity]);
      } else if (e.subType === 'noteOn') {
        // console.log('noteOn', e.typeByte);
        const m = new MIDIEvent(0x90, tick, [e.note, e.velocity]);
        result.push(m);
      }
    } else if (e.type === 'meta') {
      if (e.subType === 'setTempo') {
        const bpm = 60000000 / e.microsecondsPerBeat;
        const m = new MIDIEvent(0x51, tick, [bpm]);
        result.push(m);
      } else if (e.subType === 'timeSignature') {
        const m = new MIDIEvent(0x51, tick, [e.numerator, e.denominator, e.metronome, e.thirtySeconds]);
        result.push(m);
      } else if (typeof e.subType === 'undefined') {
        console.log(e);
      }
    }
  })
  return result;
}

export { eventsToAbsoluteTicks }

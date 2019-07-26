import { JasmidMIDIEvent, TypeMIDIEvent } from '../types';
import { MIDIEvent } from '../classes/MIDIEvent';

const events_to_absolute_ticks = (events: JasmidMIDIEvent[]): TypeMIDIEvent[] => {
  let tick = 0;
  const result = [];
  events.forEach((e) => {
    tick += e.deltaTime;
    if (e.type === 'midi') {
      if (e.subType === 'noteOff') {
        const m = new MIDIEvent(0x80, e.note, e.velocity, tick);
      } else if (e.subType === 'noteOn') {
        const m = new MIDIEvent(0x90, e.note, e.velocity, tick);
        result.push(m);
      }
    } else if (e.type === 'meta') {
      if (e.subType === 'setTempo') {
        const bpm = 60000000 / e.microsecondsPerBeat;
        //console.log('setTempo',bpm,event.microsecondsPerBeat);

        // if (tmpTicks === ticks && lastType === type) {
        //   if (sequencer.debug >= 3) {
        //     console.info('tempo events on the same tick', j, tmpTicks, bpm);
        //   }
        //   timeEvents.pop();
        // }

        // if (midifile.bpm === undefined) {
        //   midifile.bpm = bpm;
        //   // }else{
        //   //     timeEvents.push(createMidiEvent(tmpTicks, 0x51, bpm));
        // }
        // timeEvents.push(createMidiEvent(tmpTicks, 0x51, bpm));

        // const m = new MIDIEvent(0x51, e.note, e.velocity, tick);
      }
    }
  })
  return result;
}

export { events_to_absolute_ticks }

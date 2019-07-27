import { EventContainer } from './EventContainer';
import { MidiEvent } from 'jasmid.ts/lib';
import { MIDIEvent } from './MIDIEvent';

class Part extends EventContainer {
  constructor(name: string, events: MIDIEvent[] | undefined) {
    super(name);
    if (typeof events !== 'undefined') {
      this._events.push(...events);
    }
  }
}

export { Part }
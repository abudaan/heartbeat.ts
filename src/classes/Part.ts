import { EventContainer } from './EventContainer';
import { MidiEvent } from 'jasmid.ts/lib';
import { MIDIEvent } from './MIDIEvent';
import { getTrack, getSong } from '../heartbeat';
import { Track } from './Track';
import { Song } from './Song';
import { sortEvents } from '../util/event-helpers';
import { TypePosition } from '../types';

class Part extends EventContainer {
  private _events: MIDIEvent[] = [];

  private _start: TypePosition = null;
  get start() {
    return this._start;
  }

  private _track: Track | null = null;
  get track() {
    return this._track;
  }
  set track(t: Track) {
    this._track = t;
  }

  constructor(name?: string, events?: MIDIEvent[]) {
    super(name);
    if (events.length > 0) {
      this._events.push(...events);
    }
  }

  update() {
    this._events = sortEvents(this._events);
    this._start = { ticks: this._events[0].ticks };
  }

  moveTo(position: Position, update: boolean = true) {

  }

  moveEvents(events: MIDIEvent, update: boolean = true) {

  }
}

export { Part }
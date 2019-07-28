import { EventContainer } from './EventContainer';
import { MidiEvent } from 'jasmid.ts/lib';
import { MIDIEvent } from './MIDIEvent';
import { getTrack, getSong } from '../heartbeat';
import { Track } from './Track';
import { Song } from './Song';
import { sortEvents } from '../util/event-helpers';
import { TypePosition } from '../types';

class Part extends EventContainer {
  private events: MIDIEvent[] = [];
  private numEvents: number = 0;

  private _start: TypePosition = null;
  get start() {
    return this._start;
  }

  private _end: TypePosition = null;
  get end() {
    return this._end;
  }

  private _song: Song | null = null;
  get song() {
    return this._song;
  }
  set song(s: Song) {
    this._song = s;
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
    if (events && events.length > 0) {
      this.events.push(...events);
    }
    this.numEvents = this.events.length;
  }

  addEvents(events: MIDIEvent[]) {
    this.events.push(...events);
    this.update();
    if (this._song instanceof Song) {
      this._song.addEvents(events);
    }
  }

  getEvents(filter?: any): MIDIEvent[] {
    if (typeof filter === 'undefined') {
      return this.events
    }
    return [];
  }

  update() {
    this.numEvents = this.events.length;
    if (this.numEvents === 0) {
      return;
    }
    this.events = sortEvents(this.events);
    this._start = { ticks: this.events[0].ticks };
    const lastEvent = this.events[this.numEvents - 1];
    this._end = { ticks: lastEvent.ticks };
  }

  moveTo(position: Position, update: boolean = true) {

  }

  moveEvents(events: MIDIEvent, update: boolean = true) {

  }

  mute(flag: boolean): void {
    this.events.forEach(e => e.mute(flag));
  }
}

export { Part }
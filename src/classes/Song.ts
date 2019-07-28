import { EventContainer } from "./EventContainer";
import { Track } from "./Track";
import { MIDIEvent } from "./MIDIEvent";
import { ticksToMillis } from "../util/event-helpers";
import { SongConfig } from "../types";


const sortEvents = (eventA: MIDIEvent, eventB: MIDIEvent) => {
  if (eventA.sortIndex < eventB.sortIndex) {
    return -1;
  }
  if (eventA.sortIndex > eventB.sortIndex) {
    return 1;
  }
  return 0;
}

class Song extends EventContainer {
  ppq: number;
  protected _events: MIDIEvent[] = [];
  get events() {
    return this._events;
  }


  private _needsUpdate: boolean = false;
  get needsUpdate() {
    return this._needsUpdate;
  }
  // set needsUpdate(flag: boolean) {
  //   this._needsUpdate = flag;
  // }

  private _tracks: Track[] = [];
  constructor(config?: SongConfig) {
    super(config.name);
    if (config.ppq) {
      this.ppq = config.ppq;
    }
  }

  // muteTrack(name: string) {
  //   const t = this.tracks[name];
  //   if (t) {
  //     t.mute();
  //   }
  // }

  addTrack(t: Track) {
    this._tracks.push(t);
    this.addEvents(t.getEvents())
    this._needsUpdate = true;
  }

  addTracks(tracks: Track[]) {
    this._tracks.push(...tracks);
    const events = [];
    tracks.forEach(t => {
      events.push(...t.getEvents());
    });
    this.addEvents(events);
    this._needsUpdate = true;
  }

  addEvents(events: MIDIEvent[]) {
    this._events.push(...events);
    this._needsUpdate = true;
  }

  removeEvents(events: MIDIEvent[]) {
    // this._events.push(...events);
    events.forEach(e => { e.removed = true });
    this._needsUpdate = true;
  }

  update() {
    // Object.values(this._tracks).forEach((t) => {
    //   t.update();
    // });
    // TODO sort events
    this.events.filter(e => e.removed)
    this.events.sort(sortEvents);
    this._events = ticksToMillis(this.events, this.ppq);
    this._needsUpdate = false;
  }

  getTrack(name: string) {
    return this._tracks.filter(t => t.name === name)[0];
  }
}

export { Song }
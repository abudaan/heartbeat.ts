import { EventContainer } from "./EventContainer";
import { Track } from "./Track";
import { MIDIEvent } from "./MIDIEvent";

class Song extends EventContainer {
  protected _events: MIDIEvent[];
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

  private _tracks: { [id: string]: Track };
  constructor(name: string) {
    super(name);
  }

  // muteTrack(name: string) {
  //   const t = this.tracks[name];
  //   if (t) {
  //     t.mute();
  //   }
  // }

  addTrack(t: Track) {
    this._tracks[t.name] = t;
  }

  addEvents(events: MIDIEvent[]) {
    this._events.push(...events);
    this._needsUpdate = true;
  }

  removeEvents(events: MIDIEvent[]) {
    // this._events.push(...events);
    this._needsUpdate = true;
  }

  update() {
    // Object.values(this._tracks).forEach((t) => {
    //   t.update();
    // });
    // TODO sort events
  }

  getTrack(name: string) {
    return this._tracks[name];
  }
}

export { Song }
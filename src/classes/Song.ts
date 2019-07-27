import { EventContainer } from "./EventContainer";
import { Track } from "./Track";
import { MIDIEvent } from "./MIDIEvent";

class Song extends EventContainer {
  protected _events: MIDIEvent[];
  get events() {
    return this._events;
  }

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

  update() {
    Object.values(this._tracks).forEach((t) => {
      t.update();
    });

  }

  getTrack(name: string) {
    return this._tracks[name];
  }
}

export { Song }
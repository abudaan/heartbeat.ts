import { EventContainer } from "./EventContainer";
import { Track } from "./Track";

class Song extends EventContainer {
  private tracks: { [id: string]: Track };
  constructor(name: string) {
    super(name);
  }

  muteTrack(name: string) {
    const t = this.tracks[name];
    if (t) {
      t.mute();
    }
  }

  addTrack(t: Track) {
    this.tracks[t.name] = t;
  }
}

export { Song }
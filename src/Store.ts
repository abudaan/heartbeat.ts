import { Song } from './classes/Song';
import { Track } from './classes/Track';
import { Part } from './classes/Part';

class Store {
  private _songs: { [name: string]: Song } = {};
  private _tracks: { [name: string]: Track } = {};
  private _parts: { [name: string]: Part } = {};

  getSong(name: string) {
    return this._songs[name];
  }

  getTrack(name: string) {
    return this._tracks[name];
  }

  getPart(name: string) {
    return this._parts[name];
  }
}

export { Store };
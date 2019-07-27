import { Part } from './Part';
import { MIDIEvent } from './MIDIEvent';
import { EventContainer } from './EventContainer';
import { Object } from 'core-js/features/object';
import { Song } from './Song';

class Track extends EventContainer {
  private _song: Song | null = null;
  get song() {
    return this._song;
  }
  set song(s: Song) {
    this._song = s;
  }

  private _parts: Part[] = [];
  private _partsById: { [id: string]: Part };

  constructor(name?: string);
  constructor(name?: string, parts?: Part[]);
  constructor(name?: string, events?: MIDIEvent[]);
  constructor(name?: string, arg?: any) {
    super(name)
    if (arg.length > 0) {
      if (arg[0] instanceof Part) {
        arg.forEach((p: Part) => {
          this._partsById[p.name] = p;
        });
        this._parts.push(...arg);
      } else if (arg[0] instanceof MIDIEvent) {
        const p = new Part(null, arg);
        this._partsById[p.name] = p
        this._parts.push(p);
      }
    }
  }

  sortParts() {

  }

  // mute() {
  //   Object.values(this._parts).forEach((part: Part) => {
  //     part.mute(true);
  //   });
  // }

  addPart(p: Part, update: boolean = true) {
    this._parts.push(p);
    if (update === true) {
      p.update();
      this.sortParts();
    }
  }

  update() {
    this._parts.forEach((p) => {
      p.update();
    })
    this.sortParts();
  }
}

export { Track }
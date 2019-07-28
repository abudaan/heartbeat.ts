import { Part } from './Part';
import { MIDIEvent } from './MIDIEvent';
import { EventContainer } from './EventContainer';
import { Object } from 'core-js/features/object';
import { Song } from './Song';

const sortParts = (partA: Part, partB: Part) => {
  if (partA.start < partB.start) {
    return -1;
  }
  if (partA.start > partB.start) {
    return 1;
  }
  return 0;
}

class Track extends EventContainer {
  private _song: Song | null = null;
  get song() {
    return this._song;
  }
  set song(s: Song) {
    this._song = s;
  }

  private parts: Part[] = [];
  // private partsByName: { [id: string]: Part };
  private numParts: number = 0;

  constructor(name?: string);
  constructor(name?: string, parts?: Part[]);
  constructor(name?: string, events?: MIDIEvent[]);
  constructor(name?: string, arg?: any) {
    super(name)
    if (arg && arg.length > 0) {
      if (arg[0] instanceof Part) {
        // arg.forEach((p: Part) => {
        //   this.partsByName[p.name] = p;
        // });
        this.parts.push(...arg);
      } else if (arg[0] instanceof MIDIEvent) {
        const p = new Part(null, arg);
        // this.partsByName[p.name] = p
        this.parts.push(p);
      }
    }
  }

  sortParts() {
    this.parts = this.parts.sort(sortParts);
  }

  mute() {
    this.parts.forEach(p => {
      p.mute(true);
    });
  }

  addParts(parts: Part[], update: boolean = true) {
    this.numParts += parts.length;
    parts.forEach(p => {
      this.parts.push(p);
      // this.partsByName[p.name] = p;
      p.update();
      if (this._song instanceof Song) {
        this._song.addEvents(p.getEvents());
      }
    })
    this.sortParts();
  }

  removeParts(parts: Part[], update: boolean = true) {
    // delete this.partsByName[part.name];
    const partNames = parts.map(p => p.name);
    this.parts.filter(p => partNames.indexOf(p.name) === -1);
    // this.sortParts();
    if (this._song instanceof Song) {
      const events = [];
      parts.forEach(p => {
        events.push(...p.getEvents());
      })
      this._song.removeEvents(events);
    }
  }

  getEvents(filter?: any): MIDIEvent[] {
    if (typeof filter === 'undefined') {
      const events = [];
      this.parts.forEach(p => {
        events.push(...p.getEvents())
      })
      return events;
    }
  }

  update() {
    this.parts.forEach((p) => {
      p.update();
    })
    this.sortParts();
  }
}

export { Track }
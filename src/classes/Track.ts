import { Part } from './Part';
import { MIDIEvent } from './MIDIEvent';
import { EventContainer } from './EventContainer';
import { Object } from 'core-js/features/object';

class Track extends EventContainer {
  private _parts: { [id: string]: Part };
  constructor(name: string, parts: Part[]);
  constructor(name: string, events: MIDIEvent[]);
  constructor(name: string, arg: any) {
    super(name)
    if (arg.length > 0) {
      if (arg[0] instanceof Part) {
        arg.forEach((p: Part) => {
          this._parts[p.name] = p;
        })
        // this._parts.push(...arg);
      } else if (arg[0] instanceof MIDIEvent) {
        this._events.push(...arg);
      }
    }
  }

  mute() {
    Object.values(this._parts).forEach((part: Part) => {
      part.mute(true);
    });
  }
}

export { Track }
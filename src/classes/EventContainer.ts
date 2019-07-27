import uuidv4 from 'uuid';
import { MIDIEvent } from './MIDIEvent';

class EventContainer {
  protected _name: string;
  get name() {
    return this._name;
  }
  constructor(name?: string) {
    if (typeof name === 'undefined') {
      this._name = `${this.constructor.name}_${uuidv4()}`;
    } else {
      this._name = name;
    }
  }

  // mute(flag: boolean) {
  //   this._events.forEach((event) => {
  //     event.mute(flag);
  //   })
  // }
}

export { EventContainer }
import { MIDIEvent } from './MIDIEvent';

class EventContainer {
  protected _events: MIDIEvent[];
  get events() {
    return this._events;
  }
  protected _name: string;
  get name() {
    return this._name;
  }
  constructor(name: string) {
    this._name = name;
  }

  mute(flag: boolean) {
    this._events.forEach((event) => {
      event.mute(flag);
    })
  }
}

export { EventContainer }
import uuidv4 from 'uuid';
class MIDIEvent {
  private _id: string;
  get id() {
    return this._id;
  }
  // private _type: number;
  get type() {
    return this._type;
  }
  // private _ticks: number;
  get ticks() {
    return this._ticks;
  }
  // private _data1: string[] | number[];
  get data() {
    return this._data;
  }

  private _track: string | null;
  set track(t: string | null) {
    this._track = t;
  }
  get track(): string | null {
    return this._track;
  }

  private _part: string | null;
  set part(t: string | null) {
    this._part = t;
  }
  get part(): string | null {
    return this._part;
  }

  private _muted: boolean;
  get muted() {
    return this._muted;
  }

  constructor(private _type: number, private _ticks: number, private _data: string | number[] | ArrayBuffer) {
    this._id = `MIDIEvent_${uuidv4()}`;
  }

  mute(flag: boolean) {
    this._muted = flag;
  }
}

export {
  MIDIEvent
};

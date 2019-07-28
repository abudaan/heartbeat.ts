import uuidv4 from 'uuid';
import { TypePosition } from '../types';
class MIDIEvent {
  millis: number;

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

  private _song: string | null;
  set song(t: string | null) {
    this._song = t;
  }
  get song(): string | null {
    return this._song;
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

  private _removed: boolean;
  get removed() {
    return this._removed;
  }
  set removed(flag: boolean) {
    this._removed = flag;
  }

  private _moved: boolean;
  get moved() {
    return this._moved;
  }

  private _sortIndex: number = this._ticks + this._type;
  get sortIndex() {
    return this._sortIndex;
  }

  constructor(private _type: number, private _ticks: number, private _data: string | number[] | ArrayBuffer) {
    this._id = `MIDIEvent_${uuidv4()}`;
  }

  mute(flag: boolean) {
    this._muted = flag;
  }

  move(amount: TypePosition) {
    this._ticks += amount.ticks;
    this._sortIndex = this._ticks + this._type;
  }

  moveTo(pos: TypePosition) {
    this._ticks = pos.ticks;
    this._sortIndex = this._ticks + this._type;
  }
}

export {
  MIDIEvent
};

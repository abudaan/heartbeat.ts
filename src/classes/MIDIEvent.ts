class MIDIEvent {

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

  constructor(private _type: number, private _ticks: number, private _data: string | number[] | ArrayBuffer) {

  }
}

export {
  MIDIEvent
};

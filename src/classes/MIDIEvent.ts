class MIDIEvent {

  // private _type: number;
  get type() {
    return this._type;
  }
  // private _ticks: number;
  get ticks() {
    return this._ticks;
  }
  // private _data1: number;
  get data1() {
    return this._data1;
  }
  // private _data2: number;
  get data2() {
    return this._data2;
  }

  constructor(private _type: number, private _data1: number, private _data2: number, private _ticks: number) {

  }
}

export {
  MIDIEvent
};

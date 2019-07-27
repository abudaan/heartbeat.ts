import { MidiEvent } from 'jasmid.ts';
export type JasmidMIDIEvent = MidiEvent;

export type JasmidParsedMIDIFile = {
  header: {
    formatType: number,
    trackCount: number,
    ticksPerBeat: number,
  },
  tracks: JasmidMIDIEvent[][],
};

export type TypePosition = {
  ticks: number
}

// export type TypeMIDIEvent = {
//   data1: number;
//   data2: number;
//   type: number;
//   ticks: number;
//   mute: (flag: boolean) => void;
// }


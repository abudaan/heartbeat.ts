export type TypePortIndex = {
  name: string,
  id: string
};
export type TypePortsInventory = {
  inputs: TypePortIndex[],
  outputs: TypePortIndex[],
  inputsById: { [id: string]: WebMidi.MIDIInput },
  outputsById: { [id: string]: WebMidi.MIDIOutput },
};


const midiSystem = (() => {
  const inputsById = {};
  const outputsById = {};
  const inputs = [];
  const outputs = [];

  let midiInitialized = false;
  let midiAccess: WebMidi.MIDIAccess = null;

  const init = async (): Promise<void | WebMidi.MIDIAccess> => {
    //console.log(midiInitialized, navigator.requestMIDIAccess);

    if (midiInitialized === true) {
      return midiAccess;
    }
    midiInitialized = true;

    if (typeof navigator.requestMIDIAccess === 'undefined') {
      return;
    }

    return navigator.requestMIDIAccess({ sysex: false })
      .then((midi: WebMidi.MIDIAccess) => {
        midiAccess = midi;
        midiAccess.onstatechange = update;
        if (midiAccess.inputs && midiAccess.outputs) {
          update();
        }
        return midiAccess;
      })
      .catch(e => {
        console.error('MIDI could not be initialized:', e);
      })
  }

  const sortPorts = (a: TypePortIndex, b: TypePortIndex) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) { //sort string ascending
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  const update = (e?: WebMidi.MIDIConnectionEvent) => {
    // console.log('update', e);
    if (midiAccess === null) {
      return {
        inputs: [],
        outputs: [],
        inputsById: {},
        outputsById: {},
      };
    }

    midiAccess.inputs.forEach(function (input) {
      inputs.push({ name: input.name, id: input.id });
      inputsById[input.id] = input;
    });
    inputs.sort(sortPorts);

    midiAccess.outputs.forEach(function (output) {
      outputs.push({ name: output.name, id: output.id });
      outputsById[output.id] = output;
    });
    outputs.sort(sortPorts);
  }

  return {
    init,
    getPorts: (): TypePortsInventory => ({
      inputs,
      outputs,
      inputsById,
      outputsById,
    }),
  }
})();

export {
  midiSystem,
}
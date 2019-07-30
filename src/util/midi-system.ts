const midiSystem = () => {
  let midiInitialized = false;
  let midiAccess: WebMidi.MIDIAccess;

  const init = async (): Promise<WebMidi.MIDIAccess> => {
    //console.log(midiInitialized, navigator.requestMIDIAccess);

    if (midiInitialized === true) {
      return midiAccess;
    }
    midiInitialized = true;


    if (typeof navigator.requestMIDIAccess !== 'undefined') {
      navigator.requestMIDIAccess()
        .then((midi: WebMidi.MIDIAccess) => {
          midiAccess = midi;
          midiAccess.onstatechange = getDevices;
          if (midiAccess.inputs && midiAccess.outputs) {
            getDevices();
          }
        })
        .catch(e => {
          console.error('MIDI could not be initialized:', e);
        })
    }
  }


  return {
    init,
  }
}

export {
  midiSystem,
}
import loadMIDIFile, {MidiJSON} from './util/loadMIDIFile';

loadMIDIFile('./data/minute_waltz.mid')
.then((data: MidiJSON) => {
  console.log(data);
})
.catch((e:Error) => console.error(e));
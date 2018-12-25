import loadMIDIFile from './loadMIDIFile';

loadMIDIFile('./data/minute_waltz.mid')
.then(data => {
  console.log(data);
})
.catch(e => console.error(e));
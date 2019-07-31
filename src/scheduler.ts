import { MIDIEvent } from './classes/MIDIEvent';

const scheduler = (context: AudioContext, buffer: number = 50) => {

  let currentIndex = 0;
  let maxIndex = 0;
  let midiEvents = [];
  let maxTime = 0;
  let doLoop = false;

  const getEvents = () => {
    // maxTime = performance.now() + (buffer / 1000);
    maxTime = (context.currentTime * 1000) + buffer;
    doLoop = true;
    const result = [];
    while (doLoop) {
      const e = midiEvents[currentIndex++];
      if (e.millis < maxTime) {
        result.push(e);
      } else {
        doLoop = false;
      }
      if (currentIndex === maxIndex) {
        --currentIndex;
        doLoop = false;
      }
    }
    requestAnimationFrame(getEvents);
    return result;
  }

  const start = (index: number, events: MIDIEvent[]) => {
    maxIndex = events.length;
    currentIndex = index;
    midiEvents = events;
  }


  return {
    start,
    stop: () => {
      doLoop = false;
      return currentIndex;
    }
  }
};

export { scheduler };

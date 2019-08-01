import { Song } from './classes/Song';
import { MIDIEvent } from './classes/MIDIEvent';
import { sequencer } from './heartbeat';

class Scheduler {
  private currentIndex = 0;
  private currentTime = 0;
  private maxIndex = 0;
  private maxTime = 0;
  private doLoop = false;
  private timestamp = 0;
  private events: MIDIEvent[];
  private boundUpdate: () => void;
  private animationFrame: number;
  get millis() {
    return this.currentTime;
  }
  constructor(
    private song: Song,
    private buffer: number = 50,
  ) {
    this.boundUpdate = this.update.bind(this);
  }

  private update(cb: () => void) {
    this.doLoop = true;
    this.maxTime = this.song.millis + this.buffer;
    const result = [];
    while (this.doLoop) {
      const e = this.events[this.currentIndex++];
      if (e.millis < this.maxTime) {
        result.push(e);
      } else {
        this.doLoop = false;
      }
      if (this.currentIndex === this.maxIndex) {
        --this.currentIndex;
        this.doLoop = false;
      }
    }
    const now = sequencer.getTime();
    this.currentTime += now - this.timestamp;
    this.timestamp = now;
    // console.log(this.maxTime, this.song.millis);
    this.animationFrame = requestAnimationFrame(() => {
      this.update(cb);
      cb();
    });
  }

  start(cb: () => void) {
    // this.timestamp = sequencer.getTime(); // milliseconds
    this.events = this.song.events;
    this.maxIndex = this.events.length;
    // if (typeof index === 'undefined') {
    //   let i = 0;
    //   let millis = 0;
    //   while (millis < this.maxTime) {
    //     millis = this.events[i].millis;
    //     i++;
    //   }
    //   this.currentIndex = i;
    // } else {
    //   this.currentIndex = index;
    // }
    this.doLoop = true;
    // console.log('timestamp', this.timestamp, this.currentTime);
    this.update(cb);
  }

  stop() {
    this.currentTime = 0;
    this.currentIndex = 0;
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }

  pause() {
    console.log(this.animationFrame);
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    } else {
      this.animationFrame = requestAnimationFrame(this.boundUpdate);
    }
  }
}

export { Scheduler };

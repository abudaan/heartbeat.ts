import { Song } from './classes/Song';
import { MIDIEvent } from './classes/MIDIEvent';
import { sequencer } from './heartbeat';
import { animationFrameScheduler, of, timer, Observable, Scheduler, BehaviorSubject, Subscription } from 'rxjs';
import { repeat, takeUntil, takeWhile } from 'rxjs/operators';

class EventScheduler {
  private currentIndex = 0;
  private currentTime = 0;
  private maxIndex = 0;
  private maxTime = 0;
  private doLoop = false;
  private timestamp = 0;
  private events: MIDIEvent[];
  private boundUpdate: () => void;
  private stream$: Observable<any>;
  private subscription: Subscription;
  get millis() {
    return this.currentTime;
  }
  constructor(
    private song: Song,
    private buffer: number = 50,
  ) {
    this.boundUpdate = this.update.bind(this);
    this.stream$ = of(null, animationFrameScheduler)
      .pipe(
        repeat(),
      )
  }

  private update() {
    this.doLoop = true;
    this.maxTime = this.currentTime + this.buffer;
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
    // console.log(this.currentTime, now - this.timestamp);
    this.timestamp = now;
  }

  start() {
    this.timestamp = sequencer.getTime();
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
    this.subscription = this.stream$.subscribe(this.boundUpdate);
  }

  stop() {
    this.currentTime = 0;
    this.currentIndex = 0;
    this.subscription.unsubscribe();
  }

  pause() {
    if (this.subscription.closed) {
      this.subscription = this.stream$.subscribe(this.boundUpdate);
    } else {
      this.subscription.unsubscribe();
    }
  }
}

export { EventScheduler as Scheduler };

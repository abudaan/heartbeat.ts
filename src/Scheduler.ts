import { Song } from './classes/Song';
import { MIDIEvent } from './classes/MIDIEvent';
import { sequencer } from './heartbeat';
import { animationFrameScheduler, of, timer, Observable, Scheduler, BehaviorSubject } from 'rxjs';
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
  private animationFrame: number = null;
  private stream$: Observable<any>;
  private pending: BehaviorSubject<boolean>;
  get millis() {
    return this.currentTime;
  }
  constructor(
    private song: Song,
    private buffer: number = 50,
  ) {
    this.boundUpdate = this.update.bind(this);
    this.pending = new BehaviorSubject<boolean>(false);
    // this.pending.subscribe(console.log)
    // this.stream$ = of(null, animationFrameScheduler)
    //   .pipe(
    //     repeat(),
    //     takeUntil(this.pending)
    //   )
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
    this.timestamp = now;
    // animationFrameScheduler.schedule(this.update)
    // this.animationFrame = requestAnimationFrame(() => {
    //   this.update();
    // });
  }

  start() {
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
    // this.update();

    let x = 0;
    // this.pending.next(true);
    // this.stream$.subscribe(() => {
    //   console.log(x++, animationFrameScheduler.now());
    // });

    this.pending.next(true);
    of(null, animationFrameScheduler)
      .pipe(
        repeat(),
        takeUntil(this.pending)
      ).subscribe(() => {
        console.log(x++, animationFrameScheduler.now());
      });
  }

  stop() {
    this.currentTime = 0;
    this.currentIndex = 0;
    // cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.pending.next(false);
  }

  pause() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    } else {
      this.animationFrame = requestAnimationFrame(this.boundUpdate);
    }
  }
}

export { EventScheduler as Scheduler };

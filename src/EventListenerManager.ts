import { sequencer, Song } from './heartbeat';
import { Scheduler } from './Scheduler';

class EventListenerManager {
  private animationFrame: number = null;
  private listeners: { [id: string]: (() => void)[] } = {};
  constructor(private scheduler: Scheduler) {

  }

  addEventListener(type: string, listener: () => void) {
    if (typeof this.listeners[type] === 'undefined') {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  update() {

  }

  start() {
    this.animationFrame = requestAnimationFrame(() => { this.update(); });
  }

  stop() {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }
}
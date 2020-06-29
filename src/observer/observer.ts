import { sliderOptions } from '../model/sliderOptions';

type observersCallback = (data: sliderOptions) => void;
export default class EventObserver {
  private observers: observersCallback[];

  constructor() {
    this.observers = [];
  }

  public getSubscribers(): observersCallback[] {
    return this.observers;
  }

  public broadcast(data: sliderOptions): void {
    this.observers.forEach(subscriber => subscriber(data));
  }

  public subscribe(fn: observersCallback): void {
    this.observers.push(fn);
  }

  public unsubscribe(fn: observersCallback): void {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }
}

export default class EventObserver {
  private observers: Function[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: Function): void {
    this.observers.push(fn);
  }

  unsubscribe(fn: Function): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(data: object): void {
    this.observers.forEach((subscriber) => subscriber(data));
  }

  get subscribers(): Function[] {
    return this.observers;
  }
}

class EventObserver {
  private _observers: Function[];
  constructor() {
    this._observers = [];
  }
  subscribe(fn: Function): void {
    this._observers.push(fn);
  }
  unsubscribe(fn: Function): void {
    this._observers = this._observers.filter(subscriber => subscriber !== fn);
  }
  broadcast(data: object): void {
    this._observers.forEach(subscriber => subscriber(data));
  }

  get subscribers(): Function[] {
    return this._observers;
  }
}

export { EventObserver };

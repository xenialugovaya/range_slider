"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventObserver {
    constructor() {
        this._observers = [];
    }
    subscribe(fn) {
        this._observers.push(fn);
    }
    unsubscribe(fn) {
        this._observers = this._observers.filter(subscriber => subscriber !== fn);
    }
    broadcast(data) {
        this._observers.forEach(subscriber => subscriber(data));
    }
}
exports.EventObserver = EventObserver;
//# sourceMappingURL=observer.js.map
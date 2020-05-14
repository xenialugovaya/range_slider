import EventObserver from '../../../src/observer/observer';

const observer = new EventObserver();
const fn = function (data: {}) {
  return true;
};
const data = {};

describe('test subscription/unsubscription', () => {
  beforeEach(() => {
    observer.subscribe(fn);
  });

  it('test that subscription works correctly', () => {
    expect(observer.getSubscribers()).toContain(fn);
  });

  it('test that unsubscription works correctly', () => {
    observer.unsubscribe(fn);
    expect(observer.getSubscribers()).not.toContain(fn);
  });
});

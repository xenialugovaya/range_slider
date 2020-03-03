import { EventObserver } from '../../../src/observer/observer';

const observer = new EventObserver();
const fn = function(data: {}) {
  return true;
};
const data = {};

describe('test subscription/unsubscription', function() {
  beforeEach(function() {
    observer.subscribe(fn);
  });

  it('test that subscription works correctly', function() {
    expect(observer.subscribers).toContain(fn);
  });

  it('test that unsubscription works correctly', function() {
    observer.unsubscribe(fn);
    expect(observer.subscribers).not.toContain(fn);
  });
});

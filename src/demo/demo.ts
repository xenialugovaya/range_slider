import './demo.scss';
import SliderInit from './SliderInit';

const slider4 = new SliderInit({
  max: 100, min: 10, step: 10, values: [19], hasLabels: true, hasRange: false, isVertical: false,
});
const slider3 = new SliderInit({ max: 200, isVertical: true });
const slider2 = new SliderInit({ max: 200 });
const slider1 = new SliderInit({ max: 100, hasRange: true });

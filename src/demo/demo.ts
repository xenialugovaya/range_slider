import './demo.scss';
import SliderInit from './SliderInit';

const sliderFour = new SliderInit({
  max: 100, min: 10, step: 10, values: [19], hasLabels: true, hasRange: false, isVertical: false,
});
const sliderThree = new SliderInit({ max: 200, isVertical: true });
const sliderTwo = new SliderInit({ max: 200 });
const sliderOne = new SliderInit({ max: 100, hasRange: true });

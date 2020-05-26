import './demo.scss';
import SliderInit from './SliderInit';

const config = [
  {
    max: 100,
    min: 10,
    step: 10,
    values: [19],
    hasLabels: true,
    hasRange: false,
    isVertical: false,
  },
  {
    max: 200,
    isVertical: true,
  },
  {
    max: 200,
  },
  {
    max: 100,
    hasRange: true,
  },
];

config.forEach((slider) => new SliderInit(slider));

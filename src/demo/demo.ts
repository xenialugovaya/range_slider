import './demo.scss';
import SliderInit from './SliderInit';

const sliderConfigurations = [
  {
    max: 100,
    min: 10,
    step: 10,
    values: [30],
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

sliderConfigurations.forEach((sliderConfiguration) => new SliderInit(sliderConfiguration));

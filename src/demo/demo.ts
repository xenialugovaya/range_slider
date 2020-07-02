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
    max: -50,
    step: 15,
    values: [63, 64],
    hasRange: true,
    hasScale: true,
  },
];

sliderConfigurations.forEach(sliderConfiguration => new SliderInit(sliderConfiguration));

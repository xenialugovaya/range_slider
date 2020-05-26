import { sliderOptions } from '../model/sliderOptions';
import Facade from '../presenter/Facade';
import ControlPanel from './ControlPanel/ControlPanel';

export default class SliderInit {
  private options!: sliderOptions;

  private slider = document.createElement('div');

  private sliderWrapper = document.createElement('div');

  private demoSlider = document.createElement('div');

  constructor(options: sliderOptions) {
    this.init(options);
  }

  private init(options: sliderOptions) {
    this.options = options;
    this.slider.classList.add('slider');
    this.sliderWrapper.classList.add('demo-slider__slider');
    this.demoSlider.classList.add('demo-slider');
    document.body.prepend(this.demoSlider);
    this.demoSlider.append(this.sliderWrapper);
    this.sliderWrapper.append(this.slider);
    const facade: Facade = new Facade(this.slider, this.options);
    const panel: ControlPanel = new ControlPanel(facade);
  }
}

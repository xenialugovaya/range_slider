import { sliderOptions } from '../model/sliderOptions';
import Facade from '../presenter/Facade';
import ControlPanel from './ControlPanel/ControlPanel';

export default class SliderInit {
  private options!: sliderOptions;

  private slider = document.createElement('div');

  private wrapper = document.createElement('div');

  constructor(options: sliderOptions) {
    this.init(options);
  }

  private init(options: sliderOptions) {
    this.options = options;
    this.slider.classList.add('slider');
    this.wrapper.classList.add('slider__wrapper');
    document.body.append(this.wrapper);
    this.wrapper.append(this.slider);
    const facade: Facade = new Facade(this.slider, this.options);
    const panel: ControlPanel = new ControlPanel(facade);
    return { facade, panel };
  }
}

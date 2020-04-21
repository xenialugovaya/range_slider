import { sliderOptions } from '../model/sliderOptions';
import Facade from '../presenter/Facade';
import ControlPanel from './ControlPanel/ControlPanel';

export default class SliderInit {
  private options: sliderOptions;

  private slider: HTMLElement;

  private wraper: HTMLElement;

  constructor(options: sliderOptions) {
    this.options = options;
    this.wraper = document.createElement('div');
    this.slider = document.createElement('div');
    this.init();
  }

  init() {
    this.slider.classList.add('slider');
    this.wraper.classList.add('slider__wraper');
    document.body.append(this.wraper);
    this.wraper.append(this.slider);
    const facade: Facade = new Facade(this.slider, this.options);
    const panel: ControlPanel = new ControlPanel(facade);
    return { facade, panel };
  }
}

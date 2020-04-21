import { sliderOptions } from '../model/sliderOptions';
import { Facade } from '../presenter/Facade';
import { ControlPanel } from './ControlPanel/ControlPanel';

class SliderInit {
  private options: sliderOptions;

  private slider: HTMLElement;

  private wraper: HTMLElement;

  constructor(options: sliderOptions) {
    this.options = options;
    this.slider = document.createElement('div');
    this.slider.classList.add('slider');
    this.wraper = document.createElement('div');
    this.wraper.classList.add('slider__wraper');
    document.body.append(this.wraper);
    this.wraper.append(this.slider);
    this.init();
  }

  init() {
    const facade: Facade = new Facade(this.slider, this.options);
    const panel: ControlPanel = new ControlPanel(facade);
    return { facade, panel };
  }
}

export { SliderInit };

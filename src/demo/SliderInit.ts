import { sliderOptions } from '../model/sliderOptions';
import { Facade } from '../presenter/Facade';
import { ControlPanel } from './ControlPanel/ControlPanel';

class SliderInit {
  private _options: sliderOptions;
  private _slider: HTMLElement;

  constructor(options: sliderOptions) {
    this._options = options;
    this._slider = document.createElement('div');
    this._slider.classList.add('slider');
    document.body.append(this._slider);
    this.init();
  }
  init() {
    const facade: Facade = new Facade(this._slider, this._options);
    const panel: ControlPanel = new ControlPanel(facade);
    return { facade, panel };
  }
}

export { SliderInit };

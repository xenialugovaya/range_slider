import { Facade } from '../presenter/Facade';
import { ControlPanel } from './ControlPanel/ControlPanel';
class SliderInit {
    constructor(options) {
        this._options = options;
        this._slider = document.createElement('div');
        this._slider.classList.add('slider');
        document.body.append(this._slider);
        this.init();
    }
    init() {
        const facade = new Facade(this._slider, this._options);
        const panel = new ControlPanel(facade);
        return { facade, panel };
    }
}
export { SliderInit };
//# sourceMappingURL=SliderInit.js.map
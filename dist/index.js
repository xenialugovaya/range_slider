import './scss/main.scss';
import { Facade } from './presenter/Facade';
import { ControlPanel } from './ControlPanel/ControlPanel';
$(function () {
    $.fn.slider = function (options) {
        const facade = new Facade(this.get(0), options);
        const panel = new ControlPanel(facade);
        return { facade, panel };
    };
});
//# sourceMappingURL=index.js.map
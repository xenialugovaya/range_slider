import { Facade } from './presenter/Facade';
import { ControlPanel } from './ControlPanel/ControlPanel';

$(function() {
  $.fn.slider = function(options): { facade: Facade; panel: ControlPanel } {
    const facade: Facade = new Facade(this.get(0), options);
    const panel: ControlPanel = new ControlPanel(facade);
    return { facade, panel };
  };
});

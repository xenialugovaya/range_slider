import { Facade } from './presenter/Facade';
import { sliderOptions } from './model/sliderOptions';

$(function() {
  $.fn.slider = function(options) {
    const facade: Facade = new Facade(this.get(0), options);
    return facade;
  };
});

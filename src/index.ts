import './scss/main.scss';
import { Facade } from './presenter/Facade';

$(function() {
  $.fn.slider = function(options): Facade {
    const facade: Facade = new Facade(this.get(0), options);
    return facade;
  };
});

import './scss/main.scss';
import './assets/favicons/favicons';
import Facade from './presenter/Facade';

$(() => {
  $.fn.slider = function (options: any): Facade {
    const facade: Facade = new Facade(this.get(0), options);
    return facade;
  };
});

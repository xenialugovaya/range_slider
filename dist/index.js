import './scss/main.scss';
import { Facade } from './presenter/Facade';
$(function () {
    $.fn.slider = function (options) {
        const facade = new Facade(this.get(0), options);
        return facade;
    };
});
//# sourceMappingURL=index.js.map
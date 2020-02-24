"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Facade_1 = require("./presenter/Facade");
const ControlPanel_1 = require("./ControlPanel/ControlPanel");
$(function () {
    $.fn.slider = function (options) {
        const facade = new Facade_1.Facade(this.get(0), options);
        const panel = new ControlPanel_1.ControlPanel(facade);
        return { facade, panel };
    };
});
//# sourceMappingURL=index.js.map
import { HandlerView } from "./HandlerView";

type sliderMods = {
    vertical?: string,
    range?: string,
    labels?: string
}

class MainView{
   private _sliderMods: sliderMods;
   private _sliderBody: HTMLElement;
   private _parent: HTMLElement;
   private _selectedRange: HTMLElement;
   private _handlers: HandlerView[];

    constructor(parent: HTMLElement, sliderMods: sliderMods){
        this._sliderBody = document.createElement('div');
        this._sliderBody.classList.add('sliderBody');
        this._parent = parent;
        this._parent.appendChild(this._sliderBody);
        this._handlers = [new HandlerView(this._sliderBody)];
        this._selectedRange = document.createElement('div');
        this._selectedRange.classList.add('selectedRange');
        this._sliderMods =  sliderMods;
        if(this._sliderMods.vertical) this._parent.classList.add('slider_vertical');
        if(this._sliderMods.range) {
            this._handlers.push(new HandlerView(this._sliderBody));
            this._selectedRange.classList.add('range__between');
        }
    }    
}

export { MainView };
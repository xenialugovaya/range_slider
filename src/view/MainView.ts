import { HandlerView } from './HandlerView';
import { ControlPanel } from './ControlPanelView';
import { EventObserver } from '../observer/observer';

class MainView {
  public observer: EventObserver;
  private _sliderBody: HTMLElement;
  private _parent: HTMLElement;
  private _selectedRange: HTMLElement;
  private _handlers: HandlerView[];
  private _min: number;
  private _max: number;
  private _values: number[];
  private _controlPanel: ControlPanel;

  constructor(
    parent: HTMLElement,
    hasRange: boolean,
    isVertical: boolean,
    min: number,
    max: number,
    values: number[],
  ) {
    this.observer = new EventObserver;
    this._min = min;
    this._max = max;
    this._values = values;
    this._sliderBody = document.createElement('div');
    this._sliderBody.classList.add('sliderBody');
    this._parent = parent;
    this._parent.appendChild(this._sliderBody);
    this._handlers = hasRange
      ? [
          new HandlerView(this._sliderBody, isVertical, min, max),
          new HandlerView(this._sliderBody, isVertical, min, max),
        ]
      : [new HandlerView(this._sliderBody, isVertical, min, max)];
    this._selectedRange = document.createElement('div');
    this._sliderBody.appendChild(this._selectedRange);
    this._selectedRange.classList.add('selectedRange');
    if (isVertical) {
      this._parent.classList.add('slider_vertical');
    } else{
      this._parent.classList.add('slider_horizontal');
    }
    if (hasRange) this._selectedRange.classList.add('range_between');
    this._controlPanel = new ControlPanel(this._parent, hasRange, isVertical);
    this._controlPanel.createValueInputs(); 
    //не работает
    this._controlPanel.valueInputs.forEach(input => input.addEventListener('input', this.changeValues.bind(this)));
  }

  //не работает
  changeValues() {
    
     let valueData = this._controlPanel.valueInputs.map( input => parseInt(input.value) ); 
     //this.update(valueData);
     this.observer.broadcast(valueData);
  }

  update(values: number[]){
    this._handlers.forEach((handler, index) => handler.setPosition(values[index]));

  }

   setHandlerPosition(){
    this._handlers.forEach((handler, index) => handler.setPosition(this._values[index]));
   }

   setValuesToInputs() {
    this._controlPanel.valueInputs.map((input, index) => input.value = '' + this._values[index]);
   }
   //не работает
   getValuesfromInputs() {
      
   }
     
}

export { MainView };

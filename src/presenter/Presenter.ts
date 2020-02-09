import { MainModel } from '../model/MainModel';
import { MainView } from '../view/MainView';

class Presenter {
  private _model: MainModel;
  private _view: MainView;
  private _values: number[];

  constructor(parent: HTMLElement, model: MainModel) {
    this._model = model;
    this._values = this._model.rangeValue;
    this._view = new MainView(
      parent,
      this._model.hasRange,
      this._model.isVertical,
      this._model.min,
      this._model.max,
      this._values,
    );
    this.updateModel();
    this.updateView();
  
  }

//не работает
  updateModel() {
    this._view.observer.subscribe((valueData: number[])=>{
      this._model.rangeValue = valueData;
     });
  }
//не работает
  updateView() {
    this._model.observer.subscribe((valueData: number[])=>{
      this._view.update(valueData);
     });
  }
  

  setHandlersPosition(){
    this._view.setHandlerPosition();
  }

  setValuesToInputs() {
    this._view.setValuesToInputs();
   }
   //не работает
   getValuesfromInputs(valueData: number[]) {
   
    
  }
  
  

}

export { Presenter };

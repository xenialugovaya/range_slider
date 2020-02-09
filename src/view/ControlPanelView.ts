class ControlPanel {
    private _parent: HTMLElement;
    private _controlPanel: HTMLElement;
    private _valueInputs: HTMLInputElement[];
    private _hasRange: boolean;
    private _isVertical: boolean;

    constructor(parent: HTMLElement, hasRange: boolean, isVertical: boolean){
            this._parent = parent;
            this._controlPanel = document.createElement('div');
            this._controlPanel.classList.add('controlPanel');
            this._parent.after(this._controlPanel);
            this._valueInputs = [];
            this._hasRange = hasRange;
            this._isVertical = isVertical;
    }
    createValueInputs() {
        let inputSingle = document.createElement('input');
        inputSingle.classList.add('handlerValue')
        this._controlPanel.append(inputSingle);
        this._valueInputs.push(inputSingle);
        if (this._hasRange){
            let inputMin = document.querySelector('.handlerValue');
            if (inputMin) inputMin.classList.add('value_min');
            let inputMax = document.createElement('input');
            inputMax.classList.add('handlerValue', 'value_max');
            this._controlPanel.append(inputMax);
            this._valueInputs.push(inputMax);
            

        }

    }
    get valueInputs() {
        return this._valueInputs;
   }
 //не работает
   chageValues(): number[]{
    return this._valueInputs.map(input => input.valueAsNumber);
  }

   createOrientationRadios() {

   }
            
    
}

export { ControlPanel };
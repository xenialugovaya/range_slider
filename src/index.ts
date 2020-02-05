type sliderOptions = {
  min: number;
  max: number;
  step: number;
  isVertical: boolean;
  hasRange: boolean;
};

class Model{
  private _min = 0;
  private _max = 100;
  private _step = 1;
  private _isVertical = false;
  private _hasRange = false;
 constructor(sliderOptions: sliderOptions) {
      this._min = sliderOptions.min ? sliderOptions.min : this._min;
      this._max = sliderOptions.max ? sliderOptions.max : this._max;
      this._step = sliderOptions.step ? sliderOptions.step : this._step;
      this._hasRange = sliderOptions.hasRange ? sliderOptions.hasRange : this._hasRange;
      this._isVertical = sliderOptions.isVertical ? sliderOptions.isVertical : this._isVertical;
 } 
 
  


}


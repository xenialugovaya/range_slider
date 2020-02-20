import { Facade } from '../presenter/Facade';

class ControlPanel {
  private _slider: Facade;
  private _parent: HTMLElement;
  private _controlPanel: HTMLElement;
  private _minMaxInputs: HTMLInputElement[];
  private _valueInputs: HTMLInputElement[];
  private _stepInput: HTMLInputElement;
  private _orientationRadios: HTMLInputElement[];
  private _rangeRadios: HTMLInputElement[];
  private _hasRange: boolean;

  constructor(slider: Facade) {
    this._slider = slider;
    this._parent = this._slider.parent;
    this._controlPanel = document.createElement('div');
    this._valueInputs = [];
    this._minMaxInputs = [];
    this._stepInput = document.createElement('input');
    this._orientationRadios = [];
    this._rangeRadios = [];
    this._hasRange = slider.hasRange;

    this.panelInit();
    this.setEventListeners();
    this.getSliderOptions();
    this.updateValues();
  }

  private panelInit() {
    this._controlPanel.classList.add('controlPanel');
    this._parent.after(this._controlPanel);
    this.createMaxMinInputs();
    this.createValueInputs();
    this.createStepInput();
    this.createOrientationRadios();
    this.createRangeRadios();
  }

  private setEventListeners() {
    this.minMaxInputs.forEach(input =>
      input.addEventListener('change', this.notifySlider.bind(this)),
    );
    this.valueInputs.forEach(input =>
      input.addEventListener('change', this.notifySlider.bind(this)),
    );
    this.stepInput.addEventListener('change', this.notifySlider.bind(this));
    this.orientationRadios.forEach(radio =>
      radio.addEventListener('change', this.notifySlider.bind(this)),
    );
    this.rangeRadios.forEach(radio =>
      radio.addEventListener('change', this.notifySlider.bind(this)),
    );
  }

  getSliderOptions() {
    this.minMaxInputs.forEach(
      (input, index) => (input.value = this._slider.minMax[index].toString()),
    );
    this.valueInputs[0].value = this._slider.rangeValue[0].toString();
    if (this.valueInputs[1]) {
      this.valueInputs[1].value = this._slider.rangeValue[1].toString();
    }
    this.stepInput.value = this._slider.step.toString();
    this._slider.isVertical
      ? (this.orientationRadios[0].checked = true)
      : (this.orientationRadios[1].checked = true);

    if (this._slider.hasRange) {
      this.rangeRadios[1].checked = true;
    } else {
      this.rangeRadios[0].checked = true;
    }
  }

  private notifySlider() {
    const newMinMax = this.minMaxInputs.map(input => parseInt(input.value));
    const newValues = this.valueInputs.map(input => parseInt(input.value));
    const newOrientation = this.orientationRadios[0].checked ? true : false;
    const newStep = parseInt(this.stepInput.value);
    const newRange = this.rangeRadios[1].checked ? true : false;
    this._slider.minMax = newMinMax;
    this._slider.rangeValue = newValues;
    this._slider.isVertical = newOrientation;
    this._slider.step = newStep;
    this._slider.hasRange = newRange;
  }

  updateValues() {
    this._slider.observer.subscribe((values: number[]) => {
      this.valueInputs.forEach((input, index) => (input.value = values[index].toString()));
    });
  }

  private createMaxMinInputs() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Мин. значение/Макс. значение';
    const inputMin = document.createElement('input');
    const inputMax = document.createElement('input');
    inputMin.classList.add('limitValue');
    inputMax.classList.add('limitValue');
    inputMin.type = 'number';
    inputMax.type = 'number';
    this._controlPanel.append(inputMin);
    this._controlPanel.append(inputMax);
    this._minMaxInputs = [inputMin, inputMax];
  }

  get minMaxInputs() {
    return this._minMaxInputs;
  }

  private createValueInputs() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Значение бегунков';
    const inputSingle = document.createElement('input');
    inputSingle.classList.add('handlerValue');
    inputSingle.type = 'number';
    this._controlPanel.append(inputSingle);
    this._valueInputs.push(inputSingle);
    if (this._hasRange) {
      const inputMin = document.querySelector('.handlerValue');
      if (inputMin) inputMin.classList.add('value_min');
      const inputMax = document.createElement('input');
      inputMax.classList.add('handlerValue', 'value_max');
      inputMax.type = 'number';
      this._controlPanel.append(inputMax);
      this._valueInputs.push(inputMax);
    }
  }
  get valueInputs() {
    return this._valueInputs;
  }

  private createStepInput() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Значение шага';
    this._stepInput.classList.add('stepValue');
    this._stepInput.type = 'number';
    this._controlPanel.append(this._stepInput);
  }

  get stepInput() {
    return this._stepInput;
  }

  private createOrientationRadios() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Вертикальный/горизонтальный';
    const radioVertical = document.createElement('input');
    radioVertical.id = 'radio_vertical';
    const radioHorizontal = document.createElement('input');
    radioHorizontal.id = 'radio_horizontal';
    this._orientationRadios = [radioVertical, radioHorizontal];
    this._orientationRadios.forEach(radio => {
      radio.type = 'radio';
      radio.name = 'orientation';
      this._controlPanel.append(radio);
    });
  }

  get orientationRadios() {
    return this._orientationRadios;
  }

  private createRangeRadios() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Одиночное/интервал';
    const radioSingle = document.createElement('input');
    radioSingle.id = 'radio_single';
    const radioDouble = document.createElement('input');
    radioDouble.id = 'radio_double';
    this._rangeRadios = [radioSingle, radioDouble];
    this._rangeRadios.forEach(radio => {
      radio.type = 'radio';
      radio.name = 'range';
      this._controlPanel.append(radio);
    });
  }

  get rangeRadios() {
    return this._rangeRadios;
  }
}

export { ControlPanel };

import { Facade } from '../../presenter/Facade';
import { sliderOptions } from '../../model/sliderOptions';

class ControlPanel {
  private _slider: Facade;
  private _parent: HTMLElement;
  private _controlPanel: HTMLElement;
  private _minMaxInputs: HTMLInputElement[];
  private _valueInputs: HTMLInputElement[];
  private _stepInput: HTMLInputElement;
  private _orientationRadios: HTMLInputElement[];
  private _rangeRadios: HTMLInputElement[];
  private _showLabelRadios: HTMLInputElement[];
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
    this._showLabelRadios = [];
    this._hasRange = slider.hasRange;

    this.panelInit();
    this.setEventListeners();
    this.getSliderOptions();
    this.updateValues();
  }

  private panelInit() {
    this._controlPanel.classList.add('controlPanel');
    this._parent.before(this._controlPanel);
    this.createMaxMinInputs();
    this.createValueInputs();
    this.createStepInput();
    this.createOrientationRadios();
    this.createRangeRadios();
    this.createShowLabelRadios();
  }

  private setEventListeners() {
    this.minMaxInputs.forEach(input =>
      input.addEventListener('change', this.changeMinMax.bind(this)),
    );
    this.valueInputs.forEach(input =>
      input.addEventListener('change', this.changeValues.bind(this)),
    );
    this.stepInput.addEventListener('change', this.changeStep.bind(this));
    this.orientationRadios.forEach(radio =>
      radio.addEventListener('change', this.changeOrientation.bind(this)),
    );
    this.rangeRadios.forEach(radio =>
      radio.addEventListener('change', this.changeRange.bind(this)),
    );
    this.showLabelRadios.forEach(radio =>
      radio.addEventListener('change', this.changeLabelVisibility.bind(this)),
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
    if (this._slider.hasLabels) {
      this.showLabelRadios[0].checked = true;
    } else {
      this.showLabelRadios[1].checked = true;
    }
  }

  private changeMinMax() {
    const newMinMax = this.minMaxInputs.map(input => parseInt(input.value));
    this._slider.minMax = newMinMax;
  }

  private changeValues() {
    const newValues = this.valueInputs.map(input => parseInt(input.value));
    this._slider.rangeValue = newValues;
  }
  private changeStep() {
    const newStep = parseInt(this.stepInput.value);
    this._slider.step = newStep;
  }

  private changeOrientation() {
    const newOrientation = this.orientationRadios[0].checked ? true : false;
    this._slider.isVertical = newOrientation;
  }

  private changeRange() {
    const newRange = this.rangeRadios[1].checked ? true : false;
    if (!newRange) {
      this.valueInputs[1].remove();
    } else {
      this.valueInputs[0].after(this.valueInputs[1]);
    }
    this._slider.hasRange = newRange;
  }

  private changeLabelVisibility() {
    const showLabels = this.showLabelRadios[0].checked ? true : false;
    this._slider.hasLabels = showLabels;
  }

  private updateValues() {
    this._slider.observer.subscribe((valueData: sliderOptions) => {
      if (valueData.values) {
        const values = valueData.values;

        this.valueInputs.forEach((input, index) => (input.value = values[index].toString()));
      }
      if (valueData.min && valueData.max) {
        const minMax = [valueData.min, valueData.max];
        this.minMaxInputs.forEach((input, index) => (input.value = minMax[index].toString()));
      }
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

  private createShowLabelRadios() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Показать значения/Скрыть значения';
    const radioShowLabel = document.createElement('input');
    radioShowLabel.id = 'radio_showLabel';
    const radioHideLabel = document.createElement('input');
    radioHideLabel.id = 'radio_hideLabel';
    this._showLabelRadios = [radioShowLabel, radioHideLabel];
    this._showLabelRadios.forEach(radio => {
      radio.type = 'radio';
      radio.name = 'label';
      this._controlPanel.append(radio);
    });
  }
  get showLabelRadios() {
    return this._showLabelRadios;
  }
}

export { ControlPanel };

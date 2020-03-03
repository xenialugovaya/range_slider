import { Facade } from '../../presenter/Facade';
import { sliderOptions } from '../../model/sliderOptions';

class ControlPanel {
  private _slider: Facade;
  private _parent: HTMLElement;
  private _controlPanel: HTMLElement;
  private _minMaxInputs: HTMLInputElement[];
  private _valueInputs: HTMLInputElement[];
  private _stepInput: HTMLInputElement;
  private _orientationCheck: HTMLInputElement;
  private _rangeCheck: HTMLInputElement;
  private _showLabelCheck: HTMLInputElement;
  private _hasRange: boolean;

  constructor(slider: Facade) {
    this._slider = slider;
    this._parent = this._slider.parent;
    this._controlPanel = document.createElement('div');
    this._valueInputs = [];
    this._minMaxInputs = [];
    this._stepInput = document.createElement('input');
    this._orientationCheck = document.createElement('input');
    this._rangeCheck = document.createElement('input');
    this._showLabelCheck = document.createElement('input');
    this._hasRange = slider.hasRange;

    this.panelInit();
    this.setEventListeners();
    this.getSliderOptions();
    this.updateValues();
  }

  private panelInit(): void {
    this._controlPanel.classList.add('controlPanel');
    this._parent.before(this._controlPanel);
    this.createMaxMinInputs();
    this.createValueInputs();
    this.createStepInput();
    this.createOrientationCheck();
    this.createRangeCheckbox();
    this.createShowLabelCheckbox();
  }

  private setEventListeners(): void {
    this.minMaxInputs.forEach(input =>
      input.addEventListener('change', this.changeMinMax.bind(this)),
    );
    this.valueInputs.forEach(input =>
      input.addEventListener('change', this.changeValues.bind(this)),
    );
    this.stepInput.addEventListener('change', this.changeStep.bind(this));
    this.orientationCheckbox.addEventListener('change', this.changeOrientation.bind(this));

    this.rangeCheckbox.addEventListener('change', this.changeRange.bind(this));

    this.showLabelCheckbox.addEventListener('change', this.changeLabelVisibility.bind(this));
  }

  getSliderOptions(): void {
    this.minMaxInputs.forEach(
      (input, index) => (input.value = this._slider.minMax[index].toString()),
    );
    this.valueInputs[0].value = this._slider.rangeValue[0].toString();
    if (this.valueInputs[1]) {
      this.valueInputs[1].value = this._slider.rangeValue[1].toString();
    }
    this.stepInput.value = this._slider.step.toString();
    if (this._slider.isVertical) {
      this.orientationCheckbox.checked = true;
    }
    if (this._slider.hasRange) {
      this.rangeCheckbox.checked = true;
    }
    if (this._slider.hasLabels) {
      this.showLabelCheckbox.checked = true;
    }
  }

  private changeMinMax(): void {
    const newMinMax = this.minMaxInputs.map(input => parseInt(input.value));
    this._slider.minMax = newMinMax;
  }

  private changeValues(): void {
    const newValues = this.valueInputs.map(input => parseInt(input.value));
    this._slider.rangeValue = newValues;
  }
  private changeStep(): void {
    const newStep = parseInt(this.stepInput.value);
    this._slider.step = newStep;
  }

  private changeOrientation(): void {
    const newOrientation = this.orientationCheckbox.checked ? true : false;
    this._slider.isVertical = newOrientation;
  }

  private changeRange(): void {
    const newRange = this.rangeCheckbox.checked ? true : false;
    if (!newRange) {
      this.valueInputs[1].remove();
    } else {
      this.valueInputs[0].after(this.valueInputs[1]);
    }
    this._slider.hasRange = newRange;
  }

  private changeLabelVisibility(): void {
    const showLabels = this.showLabelCheckbox.checked ? true : false;
    this._slider.hasLabels = showLabels;
  }

  private updateValues(): void {
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

  private createMaxMinInputs(): void {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Min/Max';
    const inputMin = document.createElement('input');
    const inputMax = document.createElement('input');
    inputMin.classList.add('limit_value');
    inputMax.classList.add('limit_value');
    inputMin.type = 'number';
    inputMax.type = 'number';
    this._controlPanel.append(inputMin);
    this._controlPanel.append(inputMax);
    this._minMaxInputs = [inputMin, inputMax];
  }

  get minMaxInputs(): HTMLInputElement[] {
    return this._minMaxInputs;
  }

  private createValueInputs(): void {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Values';
    const inputSingle = document.createElement('input');
    inputSingle.classList.add('handler_value');
    inputSingle.type = 'number';
    this._controlPanel.append(inputSingle);
    this._valueInputs.push(inputSingle);
    if (this._hasRange) {
      const inputMin = document.querySelector('.handler_value');
      if (inputMin) inputMin.classList.add('value_min');
      const inputMax = document.createElement('input');
      inputMax.classList.add('handler_value', 'value_max');
      inputMax.type = 'number';
      this._controlPanel.append(inputMax);
      this._valueInputs.push(inputMax);
    }
  }
  get valueInputs(): HTMLInputElement[] {
    return this._valueInputs;
  }

  private createStepInput(): void {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Step';
    this._stepInput.classList.add('step_value');
    this._stepInput.type = 'number';
    this._controlPanel.append(this._stepInput);
  }

  get stepInput(): HTMLInputElement {
    return this._stepInput;
  }

  private createOrientationCheck(): void {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Vertical';
    this._orientationCheck.classList.add('vertical_checkbox');
    this._orientationCheck.type = 'checkbox';
    this._controlPanel.append(this._orientationCheck);
  }

  get orientationCheckbox(): HTMLInputElement {
    return this._orientationCheck;
  }

  private createRangeCheckbox(): void {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Range';
    this._rangeCheck.classList.add('range_checkbox');
    this._rangeCheck.type = 'checkbox';
    this._controlPanel.append(this._rangeCheck);
  }

  get rangeCheckbox(): HTMLInputElement {
    return this._rangeCheck;
  }

  private createShowLabelCheckbox(): void {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Show labels';
    this._showLabelCheck.classList.add('showlabel_checkbox');
    this._showLabelCheck.type = 'checkbox';
    this._controlPanel.append(this._showLabelCheck);
  }
  get showLabelCheckbox(): HTMLInputElement {
    return this._showLabelCheck;
  }
}

export { ControlPanel };

import { Facade } from '../../presenter/Facade';
import { sliderOptions } from '../../model/sliderOptions';

class ControlPanel {
  private slider: Facade;

  private parent: HTMLElement;

  private controlPanel: HTMLElement;

  private minMax: HTMLInputElement[];

  private values: HTMLInputElement[];

  private step: HTMLInputElement;

  private orientationCheck: HTMLInputElement;

  private rangeCheck: HTMLInputElement;

  private showLabelCheck: HTMLInputElement;

  private hasRange: boolean;

  constructor(slider: Facade) {
    this.slider = slider;
    this.parent = this.slider.parent;
    this.controlPanel = document.createElement('div');
    this.values = [];
    this.minMax = [];
    this.step = document.createElement('input');
    this.orientationCheck = document.createElement('input');
    this.rangeCheck = document.createElement('input');
    this.showLabelCheck = document.createElement('input');
    this.hasRange = slider.hasRange;

    this.panelInit();
    this.setEventListeners();
    this.getSliderOptions();
    this.updateValues();
  }

  private panelInit(): void {
    this.controlPanel.classList.add('controlPanel');
    this.parent.before(this.controlPanel);
    this.createMaxMinInputs();
    this.createValueInputs();
    this.createStepInput();
    this.createOrientationCheck();
    this.createRangeCheckbox();
    this.createShowLabelCheckbox();
  }

  private setEventListeners(): void {
    this.minMax.forEach((input) => input.addEventListener('change', this.changeMinMax.bind(this)));
    this.values.forEach((input) => input.addEventListener('change', this.changeValues.bind(this)));
    this.step.addEventListener('change', this.changeStep.bind(this));
    this.orientationCheckbox.addEventListener('change', this.changeOrientation.bind(this));

    this.rangeCheckbox.addEventListener('change', this.changeRange.bind(this));

    this.showLabelCheckbox.addEventListener('change', this.changeLabelVisibility.bind(this));
  }

  getSliderOptions(): void {
    this.minMax.forEach((input, index) => (input.value = this.slider.minMax[index].toString()));
    this.values[0].value = this.slider.rangeValue[0].toString();
    if (this.values[1]) {
      this.values[1].value = this.slider.rangeValue[1].toString();
    }
    this.step.value = this.slider.step.toString();
    if (this.slider.isVertical) {
      this.orientationCheckbox.checked = true;
    }
    if (this.slider.hasRange) {
      this.rangeCheckbox.checked = true;
    }
    if (this.slider.hasLabels) {
      this.showLabelCheckbox.checked = true;
    }
  }

  private changeMinMax(): void {
    const newMinMax = this.minMax.map((input) => parseInt(input.value));
    this.slider.minMax = newMinMax;
  }

  private changeValues(): void {
    const newValues = this.values.map((input) => parseInt(input.value));
    this.slider.rangeValue = newValues;
  }

  private changeStep(): void {
    const newStep = parseInt(this.step.value);
    this.slider.step = newStep;
  }

  private changeOrientation(): void {
    const newOrientation = !!this.orientationCheckbox.checked;
    this.slider.isVertical = newOrientation;
  }

  private changeRange(): void {
    const newRange = !!this.rangeCheckbox.checked;
    if (!newRange) {
      this.values[1].remove();
    } else {
      this.values[0].after(this.values[1]);
    }
    this.slider.hasRange = newRange;
  }

  private changeLabelVisibility(): void {
    const showLabels = !!this.showLabelCheckbox.checked;
    this.slider.hasLabels = showLabels;
  }

  private updateValues(): void {
    this.slider.observer.subscribe((valueData: sliderOptions) => {
      if (valueData.values) {
        const { values } = valueData;

        this.values.forEach((input, index) => (input.value = values[index].toString()));
      }
      if (valueData.min && valueData.max) {
        const minMax = [valueData.min, valueData.max];
        this.minMax.forEach((input, index) => (input.value = minMax[index].toString()));
      }
    });
  }

  private createMaxMinInputs(): void {
    const title = document.createElement('p');
    this.controlPanel.append(title);
    title.innerText = 'Min/Max';
    const inputMin = document.createElement('input');
    const inputMax = document.createElement('input');
    inputMin.classList.add('limit_value');
    inputMax.classList.add('limit_value');
    inputMin.type = 'number';
    inputMax.type = 'number';
    this.controlPanel.append(inputMin);
    this.controlPanel.append(inputMax);
    this.minMax = [inputMin, inputMax];
  }

  get minMaxInputs(): HTMLInputElement[] {
    return this.minMax;
  }

  private createValueInputs(): void {
    const title = document.createElement('p');
    this.controlPanel.append(title);
    title.innerText = 'Values';
    const inputSingle = document.createElement('input');
    inputSingle.classList.add('handler_value');
    inputSingle.type = 'number';
    this.controlPanel.append(inputSingle);
    this.values.push(inputSingle);
    if (this.hasRange) {
      const inputMin = document.querySelector('.handler_value');
      if (inputMin) inputMin.classList.add('value_min');
      const inputMax = document.createElement('input');
      inputMax.classList.add('handler_value', 'value_max');
      inputMax.type = 'number';
      this.controlPanel.append(inputMax);
      this.values.push(inputMax);
    }
  }

  get valueInputs(): HTMLInputElement[] {
    return this.values;
  }

  private createStepInput(): void {
    const title = document.createElement('p');
    this.controlPanel.append(title);
    title.innerText = 'Step';
    this.step.classList.add('step_value');
    this.step.type = 'number';
    this.controlPanel.append(this.step);
  }

  get stepInput(): HTMLInputElement {
    return this.step;
  }

  private createOrientationCheck(): void {
    const title = document.createElement('p');
    this.controlPanel.append(title);
    title.innerText = 'Vertical';
    this.orientationCheck.classList.add('vertical_checkbox');
    this.orientationCheck.type = 'checkbox';
    this.controlPanel.append(this.orientationCheck);
  }

  get orientationCheckbox(): HTMLInputElement {
    return this.orientationCheck;
  }

  private createRangeCheckbox(): void {
    const title = document.createElement('p');
    this.controlPanel.append(title);
    title.innerText = 'Range';
    this.rangeCheck.classList.add('range_checkbox');
    this.rangeCheck.type = 'checkbox';
    this.controlPanel.append(this.rangeCheck);
  }

  get rangeCheckbox(): HTMLInputElement {
    return this.rangeCheck;
  }

  private createShowLabelCheckbox(): void {
    const title = document.createElement('p');
    this.controlPanel.append(title);
    title.innerText = 'Show labels';
    this.showLabelCheck.classList.add('showlabel_checkbox');
    this.showLabelCheck.type = 'checkbox';
    this.controlPanel.append(this.showLabelCheck);
  }

  get showLabelCheckbox(): HTMLInputElement {
    return this.showLabelCheck;
  }
}

export { ControlPanel };

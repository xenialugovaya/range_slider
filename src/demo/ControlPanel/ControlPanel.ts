import Facade from '../../presenter/Facade';
import { sliderOptions } from '../../model/sliderOptions';

export default class ControlPanel {
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
    this.parent = this.slider.getParent();
    this.controlPanel = document.createElement('div');
    this.values = [];
    this.minMax = [];
    this.step = document.createElement('input');
    this.orientationCheck = document.createElement('input');
    this.rangeCheck = document.createElement('input');
    this.showLabelCheck = document.createElement('input');
    this.hasRange = slider.getRange();

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
    this.createOrientationCheckbox();
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
    this.minMax.forEach((input, index) => { (input.value = this.slider.getMinMax()[index].toString()); });
    this.values[0].value = this.slider.getValues()[0].toString();
    if (this.values[1]) {
      this.values[1].value = this.slider.getValues()[1].toString();
    }
    this.step.value = this.slider.getStep().toString();
    if (this.slider.getOrientation()) {
      this.orientationCheckbox.checked = true;
    }
    if (this.slider.getRange()) {
      this.rangeCheckbox.checked = true;
    }
    if (this.slider.getLabels()) {
      this.showLabelCheckbox.checked = true;
    }
  }

  private changeMinMax(): void {
    const newMinMax = this.minMax.map((input) => parseInt(input.value, 10));
    this.slider.setMinMax(newMinMax);
  }

  private changeValues(): void {
    const newValues = this.values.map((input) => parseInt(input.value, 10));
    this.slider.setValues(newValues);
  }

  private changeStep(): void {
    const newStep = parseInt(this.step.value, 10);
    this.slider.setStep(newStep);
  }

  private changeOrientation(): void {
    const newOrientation = !!this.orientationCheckbox.checked;
    this.slider.setOrientation(newOrientation);
  }

  private changeRange(): void {
    const newRange = !!this.rangeCheckbox.checked;
    if (!newRange) {
      this.values[1].remove();
    } else {
      this.values[0].after(this.values[1]);
    }
    this.slider.setRange(newRange);
  }

  private changeLabelVisibility(): void {
    const showLabels = !!this.showLabelCheckbox.checked;
    this.slider.setLabels(showLabels);
  }

  private updateValues(): void {
    this.slider.observer.subscribe((valueData: sliderOptions) => {
      if (valueData.values) {
        const { values } = valueData;
        this.values.forEach((input, index) => { (input.value = values[index].toString()); });
      }
      if (valueData.min !== undefined && valueData.max !== undefined) {
        const minMax = [valueData.min, valueData.max];
        this.minMax.forEach((input, index) => { (input.value = minMax[index].toString()); });
      }
      if (valueData.step !== undefined) {
        this.step.value = valueData.step.toString();
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

  private createOrientationCheckbox(): void {
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

import { definedOptions } from '../model/definedOptions';

export default class ScaleView {
  private parent!: HTMLElement;

  private options!: definedOptions;

  private scale = document.createElement('div');

  private scaleDivisions = document.createElement('div');

  private scaleLabels = document.createElement('div');

  constructor(parent: HTMLElement, options: definedOptions) {
    this.init(parent, options);
  }

  public setScale() {
    this.setScaleStyle();
    this.setStyles(this.scaleDivisions);
    this.setStyles(this.scaleLabels);
    let scaleValues = this.calculateDivisions();
    if (this.options.isVertical) {
      scaleValues = scaleValues.reverse();
    }
    const valuesCount = this.options.max - this.options.min;
    scaleValues.forEach((value, index) => {
      const ratio = (value - scaleValues[index - 1]) / valuesCount;
      this.scaleDivisions.append(this.setDivisions(ratio));
      this.scaleLabels.append(this.setScaleLabel(value, ratio));
    });
  }

  private calculateDivisions(): number[] {
    const scaleValues: number[] = [this.options.min];
    const valuesCount = this.options.max - this.options.min;
    let value = this.options.min;
    let prev = this.options.min;
    for (value; value < this.options.max; value += this.options.step) {
      if ((value - prev) / valuesCount < 0.1) {
        continue;
      }
      scaleValues.push(value);
      prev = value;
    }
    scaleValues.push(this.options.max);
    return scaleValues;
  }

  private setScaleStyle() {
    this.scale.style.position = 'absolute';
    this.scaleLabels.style.position = 'relative';
    if (this.options.isVertical) {
      this.scale.style.right = '100%';
      const length = this.parent.offsetHeight;
      this.scale.style.height = `${length}px`;
      this.scale.style.display = 'flex';
      this.scaleDivisions.style.width = '15px';
    } else {
      this.scale.style.top = '100%';
      this.scale.style.width = '100%';
      this.scaleDivisions.style.height = '15px';
    }
  }

  private setStyles(element: HTMLElement) {
    const styledElement = element;
    styledElement.style.display = 'flex';
    styledElement.style.justifyContent = 'space-between';
    if (this.options.isVertical) {
      styledElement.style.flexDirection = 'column';
    }
  }

  private setDivisions(ratio: number): HTMLElement {
    const division = document.createElement('div');
    division.style.flexGrow = String(ratio);
    if (this.options.isVertical) {
      division.style.borderBottom = '1px solid grey';
    } else {
      division.style.borderRight = '1px solid grey';
    }
    return division;
  }

  private setScaleLabel(value: number, ratio: number): HTMLElement {
    const scaleLabel = document.createElement('div');
    const scaleLabelContainer = document.createElement('div');
    scaleLabelContainer.style.position = 'relative';
    scaleLabel.style.position = 'absolute';
    scaleLabel.innerText = String(value);
    if (ratio) {
      scaleLabelContainer.style.flexGrow = String(ratio);
      scaleLabelContainer.append(scaleLabel);
      scaleLabel.style.bottom = this.options.isVertical ? '0px' : 'none';
      scaleLabel.style.right = '0px';
      scaleLabel.style.transform = this.options.isVertical ? 'translateY(50%)' : 'translateX(50%)';
    } else {
      scaleLabel.style.transform = this.options.isVertical
        ? 'translateY(-50%)'
        : 'translateX(-50%)';
      scaleLabel.style.right = this.options.isVertical ? '100%' : 'none';
    }
    scaleLabelContainer.append(scaleLabel);
    return scaleLabelContainer;
  }

  private init(parent: HTMLElement, options: definedOptions): void {
    this.options = options;
    this.parent = parent;
    this.scale.classList.add('slider__scale');
    this.scaleDivisions.classList.add('slider__scale-divisions');
    this.scaleLabels.classList.add('slider__scale-labels');
    if (this.options.isVertical) {
      this.parent.prepend(this.scale);
      this.scale.append(this.scaleLabels, this.scaleDivisions);
    } else {
      this.parent.append(this.scale);
      this.scale.append(this.scaleDivisions, this.scaleLabels);
    }
  }
}

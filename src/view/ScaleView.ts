import { definedOptions } from '../model/definedOptions';

export default class ScaleView {
  private parent!: HTMLElement;

  private options!: definedOptions;

  private scale = document.createElement('div');

  private scaleDivisions = document.createElement('div');

  private scaleLabels = document.createElement('div');

  private scaleValues!: number[];

  constructor(parent: HTMLElement, options: definedOptions) {
    this.init(parent, options);
  }

  public setScale(min: number, max: number, step: number) {
    this.setScaleStyle();
    this.setStyles(this.scaleDivisions);
    this.setStyles(this.scaleLabels);
    this.drawScale(min, max, step);
    if (this.options.isVertical) {
      this.parent.prepend(this.scale);
      this.scale.append(this.scaleLabels, this.scaleDivisions);
    } else {
      this.parent.append(this.scale);
      this.scale.append(this.scaleDivisions, this.scaleLabels);
    }
  }

  public updateScale(min: number, max: number, step: number) {
    this.clearScale();
    this.drawScale(min, max, step);
  }

  public removeScale() {
    this.clearScale();
    this.scaleDivisions.remove();
    this.scaleLabels.remove();
    this.scale.remove();
  }

  private clearScale() {
    this.scaleDivisions.innerHTML = '';
    this.scaleLabels.innerHTML = '';
  }

  private drawScale(min: number, max: number, step: number) {
    this.scaleValues = this.calculateDivisions(min, max, step);
    if (this.options.isVertical) {
      this.scaleValues = this.scaleValues.reverse();
    }
    const valuesCount = max - min;
    this.scaleValues.forEach((value, index) => {
      const ratio = (value - this.scaleValues[index - 1]) / valuesCount;
      this.scaleDivisions.append(this.addDivisionElement(ratio));
      this.scaleLabels.append(this.addLabelElement(value, ratio));
    });
  }

  private calculateDivisions(min: number, max: number, step: number): number[] {
    const scaleValues: number[] = [min];
    const valuesCount = max - min;
    let value = min;
    let prev = min;
    for (value; value < max; value += step) {
      if ((value - prev) / valuesCount < 0.1) {
        continue;
      }
      scaleValues.push(value);
      prev = value;
    }
    scaleValues.push(max);
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

  private addDivisionElement(ratio: number): HTMLElement {
    const division = document.createElement('div');
    division.style.flexGrow = String(ratio);
    if (this.options.isVertical) {
      division.style.borderBottom = '1px solid grey';
    } else {
      division.style.borderRight = '1px solid grey';
    }
    return division;
  }

  private addLabelElement(value: number, ratio: number): HTMLElement {
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
  }
}

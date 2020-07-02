import { definedOptions } from '../model/definedOptions';

export default class ScaleView {
  private parent!: HTMLElement;

  private scale = document.createElement('div');

  private scaleDivisions = document.createElement('div');

  private scaleLabels = document.createElement('div');

  private scaleValues!: number[];

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  public setScale(options: definedOptions) {
    const { isVertical, hasScale } = options;
    if (hasScale) {
      this.setScaleStyle(isVertical);
      this.setStyles(this.scaleDivisions, isVertical);
      this.setStyles(this.scaleLabels, isVertical);
      this.drawScale(options);
      if (isVertical) {
        this.parent.prepend(this.scale);
        this.scale.append(this.scaleLabels, this.scaleDivisions);
      } else {
        this.parent.append(this.scale);
        this.scale.append(this.scaleDivisions, this.scaleLabels);
      }
    }
  }

  public updateScale(options: definedOptions) {
    this.removeScale();
    if (options.hasScale) {
      this.setScale(options);
    }
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
    this.scale.innerHTML = '';
    this.clearStyles();
  }

  private drawScale(options: definedOptions) {
    const { min, max, step, isVertical } = options;
    this.scaleValues = this.calculateDivisions(min, max, step);
    if (isVertical) {
      this.scaleValues = this.scaleValues.reverse();
    }
    const valuesCount = max - min;
    this.scaleValues.forEach((value, index) => {
      const ratio = (value - this.scaleValues[index - 1]) / valuesCount;
      this.scaleDivisions.append(this.addDivisionElement(ratio, isVertical));
      this.scaleLabels.append(this.addLabelElement(value, ratio, isVertical));
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

  private setScaleStyle(vertical: boolean) {
    this.scale.style.position = 'absolute';
    this.scaleLabels.style.position = 'relative';
    if (vertical) {
      this.scale.style.right = '100%';
      const length = this.parent.offsetHeight;
      this.scale.style.height = `${length}px`;
      this.scale.style.display = 'flex';
      this.scaleDivisions.style.width = '15px';
    } else {
      this.scale.style.top = '100%';
      this.scale.style.width = '100%';
      this.scale.style.display = 'block';
      this.scaleDivisions.style.height = '15px';
    }
  }

  private setStyles(element: HTMLElement, vertical: boolean) {
    const styledElement = element;
    styledElement.style.display = 'flex';
    styledElement.style.justifyContent = 'space-between';
    if (vertical) {
      styledElement.style.flexDirection = 'column';
    }
  }

  private clearStyles() {
    this.scale.style.top = 'auto';
    this.scale.style.width = 'auto';
    this.scale.style.height = 'auto';
    this.scale.style.right = 'auto';
    this.scaleDivisions.style.height = 'auto';
    this.scaleDivisions.style.width = 'auto';
    this.scaleDivisions.style.flexDirection = 'row';
    this.scaleLabels.style.flexDirection = 'row';
  }

  private addDivisionElement(ratio: number, vertical: boolean): HTMLElement {
    const division = document.createElement('div');
    division.style.flexGrow = String(ratio);
    if (vertical) {
      division.style.borderBottom = '1px solid grey';
    } else {
      division.style.borderRight = '1px solid grey';
    }
    return division;
  }

  private addLabelElement(value: number, ratio: number, vertical: boolean): HTMLElement {
    const scaleLabel = document.createElement('div');
    const scaleLabelContainer = document.createElement('div');
    scaleLabelContainer.style.position = 'relative';
    scaleLabel.style.position = 'absolute';
    scaleLabel.innerText = String(value);
    if (ratio) {
      scaleLabelContainer.style.flexGrow = String(ratio);
      scaleLabelContainer.append(scaleLabel);
      scaleLabel.style.bottom = vertical ? '0px' : 'none';
      scaleLabel.style.right = '0px';
      scaleLabel.style.transform = vertical ? 'translateY(50%)' : 'translateX(50%)';
    } else {
      scaleLabel.style.transform = vertical ? 'translateY(-50%)' : 'translateX(-50%)';
      scaleLabel.style.right = vertical ? '100%' : 'none';
    }
    scaleLabelContainer.append(scaleLabel);
    return scaleLabelContainer;
  }

  private init(parent: HTMLElement): void {
    this.parent = parent;
    this.scale.classList.add('slider__scale');
    this.scaleDivisions.classList.add('slider__scale-divisions');
    this.scaleLabels.classList.add('slider__scale-labels');
  }
}

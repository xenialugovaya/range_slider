export default class LabelView {
  private label = document.createElement('div');

  constructor() {
    this.init();
  }

  public getElement(): HTMLElement {
    return this.label;
  }

  public setLabelValue(value: number): void {
    this.label.innerText = String(value);
  }

  public getLabelSize(isVertical: boolean, parent: HTMLElement): number {
    const labelSize = isVertical
      ? (this.getElement().offsetHeight / parent.offsetHeight) * 100
      : (this.getElement().offsetWidth / parent.offsetWidth) * 100;
    return labelSize;
  }

  public getFixedPositionProperty(isVertical: boolean): 'left' | 'bottom' {
    const fixedPositionProperty = isVertical ? 'left' : 'bottom';
    return fixedPositionProperty;
  }

  private init(): void {
    this.label.classList.add('slider__label');
  }
}

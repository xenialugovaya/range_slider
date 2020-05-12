export default class LabelView {
  private label: HTMLElement;

  constructor() {
    this.label = document.createElement('div');
    this.label.classList.add('label');
  }

  getElement(): HTMLElement {
    return this.label;
  }

  setLabelValue(value: number): void {
    this.label.innerText = value.toString();
  }

  getLabelSize(isVertical: boolean, parent: HTMLElement): number {
    const labelSize = isVertical
      ? (this.getElement().offsetHeight / parent.offsetHeight) * 100
      : (this.getElement().offsetWidth / parent.offsetWidth) * 100;
    return labelSize;
  }

  getFixedPositionProperty(isVertical: boolean): 'left' | 'bottom' {
    const fixedPositionProperty = isVertical ? 'left' : 'bottom';
    return fixedPositionProperty;
  }
}

export default class LabelView {
  private label: HTMLElement;

  constructor() {
    this.label = document.createElement('div');
    this.label.classList.add('label');
  }

  get elem(): HTMLElement {
    return this.label;
  }

  setLabelValue(value: number): void {
    this.label.innerText = value.toString();
  }

  getLabelSize(isVertical: boolean, parent: HTMLElement): number {
    const labelSize = isVertical
      ? (this.elem.offsetHeight / parent.offsetHeight) * 100
      : (this.elem.offsetWidth / parent.offsetWidth) * 100;

    return labelSize;
  }

  getFixedPositionProperty(isVertical: boolean): 'left' | 'bottom' {
    const fixedPositionProperty = isVertical ? 'left' : 'bottom';
    return fixedPositionProperty;
  }
}

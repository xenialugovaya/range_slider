class LabelView {
  private _label: HTMLElement;

  constructor() {
    this._label = document.createElement('div');
    this._label.classList.add('label');
  }

  get elem(): HTMLElement {
    return this._label;
  }

  setLabelValue(value: number): void {
    this._label.innerText = value.toString();
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

export { LabelView };

import LabelView from './LabelView';

export default class HandlerView {
  private parent: HTMLElement;

  private handler: HTMLElement;

  private label: LabelView | null;

  private showLabel: boolean;

  constructor(parent: HTMLElement, showLabel: boolean) {
    this.handler = document.createElement('div');
    this.parent = parent;
    this.showLabel = showLabel;
    this.label = showLabel ? new LabelView() : null;
    this.handlerInit();
  }

  private handlerInit() {
    this.parent.append(this.handler);
    this.handler.classList.add('handler');
    if (this.label) this.handler.before(this.label.elem);
  }

  private getHandlerSize(isVertical: boolean) {
    const handlerSize = isVertical
      ? (this.handler.offsetHeight / this.parent.offsetHeight) * 100
      : (this.handler.offsetWidth / this.parent.offsetWidth) * 100;
    return handlerSize;
  }

  setPosition(value: number, min: number, max: number, isVertical: boolean) {
    const valuesCount = max - min;
    const positionProperty = isVertical ? 'bottom' : 'left';
    const handlerSize = this.getHandlerSize(isVertical);
    const position = ((value - min) / valuesCount) * 100 - handlerSize / 2;
    this.handler.style[positionProperty] = `${position}%`;
    this.setLabelPosition(value, valuesCount, min, isVertical);
    return position;
  }

  private setLabelPosition(value: number, valuesCount: number, min: number, isVertical: boolean) {
    if (this.label) {
      this.setLabelValue(value);
      const labelSize = this.label.getLabelSize(isVertical, this.parent);
      const fixedPositionProperty = this.label.getFixedPositionProperty(isVertical);
      const positionProperty = isVertical ? 'bottom' : 'left';
      const labelPosition = ((value - min) / valuesCount) * 100 - labelSize / 2;
      this.label.elem.style[positionProperty] = `${labelPosition}%`;
      this.label.elem.style[fixedPositionProperty] = '330%';
    }
  }

  get elem() {
    return this.handler;
  }

  get labelElem() {
    return this.label?.elem;
  }

  private setLabelValue(value: number) {
    if (this.label) this.label.setLabelValue(value);
  }

  updateLabel(showLabel: boolean | undefined, value: number) {
    if (showLabel) {
      this.label = this.label ? this.label : new LabelView();
      this.setLabelValue(value);
      this.handler.before(this.label.elem);
    } else {
      this.label?.elem.remove();
    }
  }
}

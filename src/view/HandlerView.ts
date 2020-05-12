import LabelView from './LabelView';

export default class HandlerView {
  private parent!: HTMLElement;

  private handler = document.createElement('div');

  private label!: LabelView | null;

  constructor(parent: HTMLElement, showLabel: boolean) {
    this.init(parent, showLabel);
  }

  public setPosition(value: number, min: number, max: number, isVertical: boolean): number {
    const valuesCount = max - min;
    const positionProperty = isVertical ? 'bottom' : 'left';
    const handlerSize = this.getHandlerSize(isVertical);
    const position = ((value - min) / valuesCount) * 100 - handlerSize / 2;
    this.handler.style[positionProperty] = `${position}%`;
    this.setLabelPosition(value, valuesCount, min, isVertical);
    return position;
  }

  public updateLabel(showLabel: boolean | undefined, value: number): void {
    if (showLabel) {
      this.label = this.label ? this.label : new LabelView();
      this.setLabelValue(value);
      this.handler.before(this.label.getElement());
    } else {
      this.label?.getElement().remove();
    }
  }

  public getElement(): HTMLElement {
    return this.handler;
  }

  public getLabelElement(): HTMLElement | undefined {
    return this.label?.getElement();
  }

  private init(parent: HTMLElement, showLabel: boolean): void {
    this.parent = parent;
    this.parent.append(this.handler);
    this.handler.classList.add('handler');
    this.label = showLabel ? new LabelView() : null;
    if (this.label) this.handler.before(this.label.getElement());
  }

  private getHandlerSize(isVertical: boolean): number {
    const handlerSize = isVertical
      ? (this.handler.offsetHeight / this.parent.offsetHeight) * 100
      : (this.handler.offsetWidth / this.parent.offsetWidth) * 100;
    return handlerSize;
  }

  private setLabelPosition(value: number, valuesCount: number, min: number, isVertical: boolean): void {
    if (this.label) {
      this.setLabelValue(value);
      const labelSize = this.label.getLabelSize(isVertical, this.parent);
      const fixedPositionProperty = this.label.getFixedPositionProperty(isVertical);
      const positionProperty = isVertical ? 'bottom' : 'left';
      const labelPosition = ((value - min) / valuesCount) * 100 - labelSize / 2;
      this.label.getElement().style[positionProperty] = `${labelPosition}%`;
      this.label.getElement().style[fixedPositionProperty] = '330%';
    }
  }

  private setLabelValue(value: number): void {
    if (this.label) this.label.setLabelValue(value);
  }
}

import LabelView from '../../../src/view/LabelView';

const label = new LabelView();

describe('test label view', () => {
  beforeEach(() => {
    setFixtures('<div class="slider"><div class="slider__body"></div></div>');
  });

  it('label should have class label', () => {
    expect(label.getElement()).toHaveClass('slider__label');
  });

  it('value to label should be set correctly', () => {
    label.setLabelValue(10);
    expect(label.getElement().innerText).toEqual('10');
  });

  it('should return correct position property depending on orientation', () => {
    let isVertical = true;
    expect(label.getFixedPositionProperty(isVertical)).toEqual('left');
    isVertical = false;
    expect(label.getFixedPositionProperty(isVertical)).toEqual('bottom');
  });

  it('should return label width in %, if orientation is horizontal', () => {
    const parent: HTMLElement | null = document.querySelector('.slider__body');
    parent?.append(label.getElement());
    $('.slider__body').css({ width: '100px' });
    $('.slider__label').css({ width: '10px', padding: '0' });
    const isVertical = false;

    if (parent) expect(label.getLabelSize(isVertical, parent)).toEqual((10 / 100) * 100);
  });

  it('should return label height in %, if orientation is vertical', () => {
    const parent: HTMLElement | null = document.querySelector('.sliderBody');
    parent?.append(label.getElement());
    $('.slider__body').css({ height: '100px' });
    $('.slider__label').css({ height: '10px', padding: '0' });
    const isVertical = true;

    if (parent) expect(label.getLabelSize(isVertical, parent)).toEqual((10 / 100) * 100);
  });
});

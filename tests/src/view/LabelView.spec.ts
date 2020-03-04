import { LabelView } from '../../../src/view/LabelView';

const label = new LabelView();

describe('test label view', function() {
  beforeEach(function() {
    setFixtures('<div class="slider"><div class="sliderBody"></div></div>');
  });

  it('label should have class label', function() {
    expect(label.elem).toHaveClass('label');
  });

  it('value to label should be set correctly', function() {
    label.setLabelValue(10);
    expect(label.elem.innerText).toEqual('10');
  });

  it('should return correct position property depending on orientation', function() {
    let isVertical = true;
    expect(label.getFixedPositionProperty(isVertical)).toEqual('left');
    isVertical = false;
    expect(label.getFixedPositionProperty(isVertical)).toEqual('bottom');
  });

  it('should return label width in %, if orientation is horizontal', function() {
    const parent: HTMLElement | null = document.querySelector('.sliderBody');
    parent?.append(label.elem);
    $('.sliderBody').css({ width: '100px' });
    $('.label').css({ width: '10px', padding: '0' });
    const isVertical = false;

    if (parent) expect(label.getLabelSize(isVertical, parent)).toEqual((10 / 100) * 100);
  });

  it('should return label height in %, if orientation is vertical', function() {
    const parent: HTMLElement | null = document.querySelector('.sliderBody');
    parent?.append(label.elem);
    $('.sliderBody').css({ height: '100px' });
    $('.label').css({ height: '10px', padding: '0' });
    const isVertical = true;

    if (parent) expect(label.getLabelSize(isVertical, parent)).toEqual((10 / 100) * 100);
  });
});

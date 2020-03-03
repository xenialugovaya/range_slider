import { LabelView } from '../../../src/view/LabelView';

const label = new LabelView();

describe('test label view', function() {
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
});

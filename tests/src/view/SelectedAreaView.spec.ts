import SelectedArea from '../../../src/view/SelectedAreaView';

describe('test SelectedArea view', () => {
  setFixtures(
    '<div class="slider"><div class="sliderBody"><div class="handler" id="handler_min"></div><div class="handler" id="handler_max"></div></div></div>',
  );
  const parent: any = document.querySelector('.sliderBody');
  let range = false;
  const vertical = true;
  const handlerMin: any = document.querySelector('#handler_min');
  const handlerMax: any = document.querySelector('#handler_max');

  const selectedArea = new SelectedArea(parent, range, vertical, handlerMin, handlerMax);

  afterEach(() => {
    range = false;
  });
  it('if range false, class selectedRange should exist', () => {
    range = false;
    selectedArea.updateSelectedRange(range, vertical, handlerMax, handlerMin);
    expect(selectedArea.getSelectedArea()).toHaveClass('slider__selected');
  });

  it('if range true, class range_between should exist', () => {
    range = true;
    selectedArea.updateSelectedRange(range, vertical, handlerMax, handlerMin);
    expect(selectedArea.getSelectedArea()).toHaveClass('slider__selected-range');
  });
});

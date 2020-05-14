import SelectedArea from '../../../src/view/SelectedAreaView';

describe('test SelectedArea view', () => {
  setFixtures(
    '<div class="slider"><div class="sliderBody"><div class="handler" id="handler_min"></div><div class="handler" id="handler_max"></div></div></div>',
  );
  const parent: any = document.querySelector('.sliderBody');
  let range = false;
  let vertical = true;
  const handlerMin: any = document.querySelector('#handler_min');
  const handlerMax: any = document.querySelector('#handler_max');
  const handlers = [handlerMin, handlerMax];

  const selectedArea = new SelectedArea(parent, range, vertical, handlers);

  afterEach(() => {
    range = false;
  });
  it('if range false, class slider__selected should exist', () => {
    range = false;
    selectedArea.updateSelectedRange(range, vertical, handlers);
    expect(selectedArea.getSelectedArea()).toHaveClass('slider__selected');
  });

  it('if range true, class slider__selected-range should exist', () => {
    range = true;
    selectedArea.updateSelectedRange(range, vertical, handlers);
    expect(selectedArea.getSelectedArea()).toHaveClass('slider__selected-range');
  });

  it('check default styles for horizontal orientation', () => {
    vertical = false;
    expect(selectedArea.getSelectedArea().style.bottom).toEqual('0%');
  });
});

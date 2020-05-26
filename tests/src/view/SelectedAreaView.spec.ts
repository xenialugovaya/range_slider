import SelectedArea from '../../../src/view/SelectedAreaView';

describe('test SelectedArea view', () => {
  setFixtures(
    '<div class="slider"><div class="sliderBody"><div class="handler" id="handler_min"></div><div class="handler" id="handler_max"></div></div></div>',
  );

  const handlerMin: any = document.querySelector('#handler_min');

  const handlerMax: any = document.querySelector('#handler_max');

  const sliderBody: any = document.querySelector('.sliderBody');

  const options: {
    sliderBody: HTMLDivElement;
    hasRange: boolean;
    isVertical: boolean;
    handlers: any[];
  } = {
    sliderBody,
    hasRange: true,
    isVertical: true,
    handlers: [handlerMin, handlerMax],
  };
  const selectedArea = new SelectedArea(options);

  afterEach(() => {
    options.hasRange = false;
  });
  it('if range false, class slider__selected should exist', () => {
    options.hasRange = false;
    selectedArea.updateSelectedRange(options.hasRange, options.isVertical, options.handlers);
    expect(selectedArea.getSelectedArea()).toHaveClass('slider__selected');
  });

  it('if range true, class slider__selected-range should exist', () => {
    options.hasRange = true;
    selectedArea.updateSelectedRange(options.hasRange, options.isVertical, options.handlers);
    expect(selectedArea.getSelectedArea()).toHaveClass('slider__selected-range');
  });

  it('check default styles for horizontal orientation', () => {
    options.isVertical = false;
    const {
      hasRange, isVertical, handlers,
    } = options;
    selectedArea.updateSelectedRange(hasRange, isVertical, handlers);
    expect(selectedArea.getSelectedArea().style.bottom).toEqual('0%');
    expect(selectedArea.getSelectedArea().offsetHeight).toEqual(sliderBody.offsetHeight);
  });

  it('check default styles for vertical orientation', () => {
    options.isVertical = true;
    const {
      hasRange, isVertical, handlers,
    } = options;
    selectedArea.updateSelectedRange(hasRange, isVertical, handlers);
    expect(selectedArea.getSelectedArea().style.left).toEqual('0%');
    expect(selectedArea.getSelectedArea().offsetWidth).toEqual(sliderBody.offsetWidth);
  });

  it('check default styles for single handler', () => {
    options.hasRange = false;
    const {
      hasRange, isVertical, handlers,
    } = options;
    selectedArea.updateSelectedRange(hasRange, isVertical, handlers);
    expect(selectedArea.getSelectedArea().style.left).toEqual('0%');
  });
});

import SelectedArea from '../../../src/view/SelectedAreaView';

describe('test SelectedArea view', () => {
  setFixtures(
    '<div class="slider"><div class="sliderBody"><div class="handler" id="handler_min"></div><div class="handler" id="handler_max"></div></div></div>',
  );
  // if (document.querySelector('#handler_min') !== null && document.querySelector('#handler_max') !== null)

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
    hasRange: false,
    isVertical: true,
    handlers: [handlerMin, handlerMax],
  };
  // options.sliderBody = document.querySelector('.sliderBody');
  // options.hasRange = false;
  // options.isVertical = true;
  // options.handlers[0] = document.querySelector('#handler_min');
  // options.handlers[1] = document.querySelector('#handler_max');

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
    expect(selectedArea.getSelectedArea().style.bottom).toEqual('0%');
    options.hasRange = false;
    expect(selectedArea.getSelectedArea().style.left).toEqual('0%');
  });
});

import HandlerView from '../../../src/view/HandlerView';

describe('test handler view logic', () => {
  setFixtures('<div class="slider"><div class="sliderBody"></div></div>');
  const parent: any = document.querySelector('.sliderBody');
  let handler = new HandlerView(parent, true);

  describe('test get func for handler and label elements', () => {
    it('should return handler htmlelement', () => {
      expect(handler.elem).toHaveClass('handler');
    });
    it('should return label htmlelement', () => {
      expect(handler.labelElem).toHaveClass('label');
    });
  });

  describe('test setPosition func for handler and label', () => {
    beforeEach(() => {
      setFixtures('<div class="slider"><div class="sliderBody"></div></div>');
      const parent: any = document.querySelector('.sliderBody');
      handler = new HandlerView(parent, true);
    });
    it('should set position for handler correctly', () => {
      $('.handler').css({ height: '10px' });
      $('.sliderBody').css({ height: '100px' });
      const value = 10;
      const min = 0;
      const max = 20;
      let isVertical = true;

      expect(handler.setPosition(value, min, max, isVertical)).toEqual(45);

      $('.handler').css({ width: '10px' });
      $('.sliderBody').css({ width: '100px' });
      isVertical = false;
      expect(handler.setPosition(value, min, max, isVertical)).toEqual(45);
    });
  });

  describe('test updateLabel func', () => {
    it('updateLabel should add label if flag showlabel is true', () => {
      setFixtures('<div class="slider"><div class="sliderBody"></div></div>');
      const parent: any = document.querySelector('.sliderBody');
      handler = new HandlerView(parent, false);
      const value = 10;
      const showLabel = true;
      expect(handler.labelElem).not.toExist();

      handler.updateLabel(showLabel, value);
      expect(handler.labelElem).toExist();
      expect($('.label')).toExist();
      expect(handler.labelElem).toHaveClass('label');
    });

    it('updateLabel should remove label if flag showlabel is false', () => {
      setFixtures('<div class="slider"><div class="sliderBody"></div></div>');
      const parent: any = document.querySelector('.sliderBody');
      handler = new HandlerView(parent, true);
      const value = 10;
      const showLabel = false;
      handler.updateLabel(showLabel, value);
      expect($('.label')).not.toExist();
    });
  });
});

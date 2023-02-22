import { Block } from '../Block';

describe('Block', () => {
  test('should update component when set new props', () => {
    const MOCK_PREV_PROPS = {};
    const MOCK_NEXT_PROPS = { title: 'test', subtitle: 'test' };

    const component = new Block(MOCK_PREV_PROPS);

    const spyOn = jest.spyOn(component, 'componentDidUpdate');

    component.setProps(MOCK_NEXT_PROPS);

    expect(spyOn).toHaveBeenCalledWith(MOCK_PREV_PROPS, MOCK_NEXT_PROPS);
    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  test('should return right document element', () => {
    const component = new Block({});
    const element = component._createDocumentElement('div');

    expect(element).toBeEmptyDOMElement();
  });

  test('_createResources() should create empty div element', () => {
    const mockFn = jest.fn();
    const component = new Block({ events: { click: mockFn } });
    component._createResources();

    expect(component.getContent()).toBeEmptyDOMElement();
  });
});

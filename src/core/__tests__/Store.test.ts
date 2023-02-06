import { createStore, StoreEvents } from '../Store';

describe('Store', () => {
  test('should set state', () => {
    const store = createStore({});
    const mockState = { userId: 123 };

    store.set(mockState);

    expect(store.getState()).toEqual(mockState);
  });

  test('should emit events on update', () => {
    const oldMockState = { userId: 333 };
    const newMockState = { userId: 666 };
    const store = createStore(oldMockState);
    const mockFn = jest.fn();

    store.on(StoreEvents.UPDATED, mockFn);

    store.set(newMockState);

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(oldMockState, newMockState);
  });

  test('should return state', () => {
    const mockState = { userId: 123 };
    const store = createStore(mockState);

    expect(store.getState()).toEqual(mockState);
  });

  test('dispatch should call function', () => {
    const mockFn = jest.fn();
    const mockState = { userId: 123 };
    const store = createStore(mockState);
    store.dispatch(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('dispatch should set new state', () => {
    const oldMockState = { userId: 333 };
    const newMockState = { userId: 666 };
    const store = createStore(oldMockState);
    store.dispatch(newMockState);

    expect(store.getState()).toEqual(newMockState);
  });
});

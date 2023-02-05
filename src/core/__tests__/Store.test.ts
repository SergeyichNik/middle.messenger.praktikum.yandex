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
});

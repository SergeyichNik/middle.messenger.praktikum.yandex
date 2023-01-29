import EventBus from './EventBus';

export type Indexed = {
  [key in string]: unknown;
};

export enum StoreEvents {
  UPDATED = 'updated',
}

export type Dispatch<State> = (nextStateOrAction: Partial<State> | Action<State>) => void;

export type Action<State> = (dispatch: Dispatch<State>, state: State) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();
    this.state = defaultState;
    this.set = this.set.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.set(defaultState);
  }

  public getState(): State {
    return this.state;
  }

  public set(nextState: Partial<State>): void {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.UPDATED, prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>): void {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch, this.state);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}

export function createStore<RootState extends Record<string, any>>(
  reducer: RootState,
): Store<RootState> {
  return new Store(reducer);
}

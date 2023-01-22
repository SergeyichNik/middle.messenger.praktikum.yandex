import { Block } from '../../core';
import { Dispatch, Indexed, StoreEvents } from '../../core/Store';
import { store } from '../../store/rootStore';
import isEqual from './isEqual';

type BlockConstructor<P = any> = new (props?: P) => Block<P>;
export type MapStateToProps<State = any> = (state: State) => Partial<State>;
export type MapDispatchToProps<T = any> = (dispatch: Dispatch<T>) => Record<string, any>;

export function connect<P>(
  Component: BlockConstructor<P>,
  mapStateToProps: MapStateToProps,
  mapDispatchToProps: MapDispatchToProps,
): BlockConstructor<P> {
  return class extends Component {
    constructor(props: P) {
      let state: Indexed = mapStateToProps(store.getState());

      super({ ...props, ...state, ...mapDispatchToProps(store.dispatch) });

      store.on(StoreEvents.UPDATED, () => {
        const newState: Indexed = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...mapStateToProps(store.getState()) } as P);
        }

        state = newState;
      });
    }
  } as BlockConstructor<P>;
}

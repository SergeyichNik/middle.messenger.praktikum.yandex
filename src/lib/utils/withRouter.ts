import { Block } from '../../core';
import { router } from '../../core/Router';

interface WithRouterProps {
  router?: string;
}

type BlockConstructor<P> = new (props?: P) => Block<P>;

export function withRouter<P extends WithRouterProps>(
  Component: BlockConstructor<P>,
): BlockConstructor<P> {
  return class extends Component {
    // @ts-expect-error
    public static componentName = Component.componentName || Component.name;
    constructor(props?: P) {
      // @ts-expect-error
      super({ ...props, route: router.params() });
    }
  } as BlockConstructor<P>;
}

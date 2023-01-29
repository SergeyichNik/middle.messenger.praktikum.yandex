import Block from 'core/Block';
import './style.css';
import { withRouter } from '../../lib/utils/withRouter';

class NotFoundContainer extends Block {
  static componentName = 'NotFound';

  protected render(): string {
    // language=hbs
    return `
        <div class="container">
            <div class="mat mat__not-found">
                <p class="not-found__code">404</p>
                <p class="not-found__text">Страница не найдена</p>
                {{{ Link text="На главную" href="/"}}}
            </div>
        </div>
    `;
  }
}

export const NotFound = withRouter(NotFoundContainer);

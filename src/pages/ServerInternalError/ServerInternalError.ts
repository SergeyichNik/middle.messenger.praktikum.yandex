import Block from 'core/Block';
import './style.css';

export class ServerInternalError extends Block {
  static componentName = 'ServerInternalError';

  protected render(): string {
    // language=hbs
    return `
        <div class="container">
            <div class="mat mat__not-found">
                <p class="not-found__code">5XX</p>
                <p class="not-found__text">Что то пошло не так...</p>
                {{{ Link text="На главную" href="/"}}}
            </div>
        </div>
    `;
  }
}

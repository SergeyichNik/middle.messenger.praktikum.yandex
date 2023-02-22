import { Routes } from '../router/initRouter';

interface Route {
  path: string;
  component: () => void;
}

export class Router {
  private readonly routes: Route[];
  public isStarted: boolean;
  public currentRoute: Nullable<Route>;
  constructor() {
    this.routes = [];
    this.isStarted = false;
    this.currentRoute = null;
  }

  route(path: string, component: () => void): Router {
    this.routes.push({ path, component });
    return this;
  }

  params(): Record<string, string> {
    const temp = { parent: '', path: '' };
    if (this.currentRoute) {
      this.currentRoute.path.split('/').forEach((path, i) => {
        if (i === 1) {
          temp.parent = path;
        } else {
          temp.path = path;
        }
      });
    }
    return temp;
  }

  private getRoute(path: string): boolean {
    const found = this.routes.find(route => route.path === path);
    if (found) {
      this.currentRoute = found;
      return true;
    }
    return false;
  }

  getRoutes(): Route[] {
    return this.routes;
  }

  onRouteChange(): void {
    this.currentRoute?.component();
  }

  navigate(path: string = location.pathname, state?: {}): void {
    if (this.getRoute(path)) {
      history.pushState(state, '', path);
      this.getRoute(path);
    } else {
      this.getRoute(Routes.NOT_FOUND);
    }
    this.onRouteChange();
  }

  init(): void {
    window.onpopstate = () => {
      this.navigate();
    };
    this.navigate();
  }

  start(): void {
    if (!this.isStarted) {
      this.isStarted = true;
      this.navigate();
    }
  }
}

export const router = new Router();

export type RouterType = InstanceType<typeof Router>;

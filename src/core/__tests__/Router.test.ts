import { Router } from '../Router';

describe('Router', () => {
  test('should add new routes', () => {
    const router = new Router();
    const MOCK_PATH = 'mock';

    router.route(MOCK_PATH, () => {});

    expect(router.getRoutes()).toHaveLength(1);
    expect(router.getRoutes()[0].path).toMatch(MOCK_PATH);
  });

  test('should call fn with right path', () => {
    const router = new Router();
    const shouldCall = jest.fn();
    const shouldNotCall = jest.fn();

    const FIRST_PATH = '/first';
    const SECOND_PATH = '/second';

    router.route(FIRST_PATH, shouldCall).route(SECOND_PATH, shouldNotCall);

    router.navigate(FIRST_PATH);

    expect(router.getRoutes()).toHaveLength(2);
    expect(shouldNotCall).not.toHaveBeenCalled();
    expect(shouldCall).toHaveBeenCalled();
  });

  test('should call not found route', () => {
    const router = new Router();
    const shouldCall = jest.fn();
    const shouldNotCall = jest.fn();

    const FIRST_PATH = '/first';
    const INVALID_PATH = '/invalid';
    const NOT_FOUND_PATH = '/*';

    router.route(FIRST_PATH, shouldNotCall).route(NOT_FOUND_PATH, shouldCall);

    router.navigate(INVALID_PATH);

    expect(router.getRoutes()).toHaveLength(2);
    expect(shouldNotCall).not.toHaveBeenCalled();
    expect(shouldCall).toHaveBeenCalled();
  });
});

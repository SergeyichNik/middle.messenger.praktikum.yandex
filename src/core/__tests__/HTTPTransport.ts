import { HTTPTransport } from '../index';
import { RequestOptions } from '../HTTPTransport';

const FAKE_BASE_API = 'https://fake/';
const REQUEST_URL = 'test';
const FAKE_DATA: Partial<RequestOptions<{}>> = { data: 'for test' };

describe('HTTPTransport', () => {
  test('should send request by GET method', () => {
    const rest = new HTTPTransport(FAKE_BASE_API);
    const DEFAULT_OPTIONS: Partial<RequestOptions<{}>> = { method: 'GET' };
    const spyOn = jest.spyOn(rest, 'request');

    void rest.get(REQUEST_URL);
    expect(spyOn).toHaveBeenCalledWith(REQUEST_URL, DEFAULT_OPTIONS);
  });

  test('should add query params to url', () => {
    const rest = new HTTPTransport(FAKE_BASE_API);
    const spyOn = jest.spyOn(rest, 'request');

    const REQUEST_DATA = { chat: 'fake', ya: 'make' };
    const REQUEST_URL_WITH_QUERY = 'test?chat=fake&ya=make';
    const DEFAULT_OPTIONS: Partial<RequestOptions<{}>> = { method: 'GET' };

    void rest.get(REQUEST_URL, { data: REQUEST_DATA });
    expect(spyOn).toHaveBeenCalledWith(REQUEST_URL_WITH_QUERY, DEFAULT_OPTIONS);
  });

  test('should send request by POST method', () => {
    const rest = new HTTPTransport(FAKE_BASE_API);

    const DEFAULT_OPTIONS: Partial<RequestOptions<{}>> = { method: 'POST' };
    const spyOn = jest.spyOn(rest, 'request');

    void rest.post(REQUEST_URL, FAKE_DATA);
    expect(spyOn).toHaveBeenCalledWith(REQUEST_URL, { ...FAKE_DATA, ...DEFAULT_OPTIONS });
  });

  test('should send request by PUT method', () => {
    const rest = new HTTPTransport(FAKE_BASE_API);

    const DEFAULT_OPTIONS: Partial<RequestOptions<{}>> = { method: 'PUT' };
    const spyOn = jest.spyOn(rest, 'request');

    void rest.put(REQUEST_URL, FAKE_DATA);
    expect(spyOn).toHaveBeenCalledWith(REQUEST_URL, { ...FAKE_DATA, ...DEFAULT_OPTIONS });
  });

  test('should send request by DELETE method', () => {
    const rest = new HTTPTransport(FAKE_BASE_API);

    const DEFAULT_OPTIONS: Partial<RequestOptions<{}>> = { method: 'DELETE' };
    const spyOn = jest.spyOn(rest, 'request');

    void rest.delete(REQUEST_URL, FAKE_DATA);
    expect(spyOn).toHaveBeenCalledWith(REQUEST_URL, { ...FAKE_DATA, ...DEFAULT_OPTIONS });
  });
});

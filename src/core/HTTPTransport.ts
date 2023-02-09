type METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ParamsDataType = Record<string, any>;

function queryStringify(data: ParamsDataType): string {
  const arrData = Object.entries(data);
  return arrData.reduce((curr, prev, i) => {
    const key = prev[0];
    const value = prev[1];
    const divider = arrData.length === i + 1 ? '' : '&';

    return `${curr}${key}=${String(value)}${divider}`;
  }, '?');
}

const parseRes = (obj: string): Record<string, any> | string => {
  try {
    return JSON.parse(obj);
  } catch (e) {
    return obj;
  }
};

export interface RequestOptions<T> {
  method: METHODS;
  timeout: number;
  data: T;
  headers: Record<string, string>;
}

export default class HTTPTransport {
  private readonly baseApi: string;
  constructor(baseApi: string) {
    this.baseApi = baseApi;
  }

  get = async <T, F>(url: string, options?: Partial<RequestOptions<T>>): Promise<F> => {
    let query = '';
    if (options?.data) {
      query = queryStringify(options.data);
    }

    return await this.request<T>(`${url}${query}`, { method: 'GET' });
  };

  post = async <T, F>(url: string, options?: Partial<RequestOptions<T>>): Promise<F> => {
    return await this.request(url, { ...options, method: 'POST' });
  };

  put = async <T, F>(url: string, options: Partial<RequestOptions<T>>): Promise<F> => {
    return await this.request<T>(url, { ...options, method: 'PUT' });
  };

  delete = async <T, F>(url: string, options?: Partial<RequestOptions<T>>): Promise<F> => {
    return await this.request<T>(url, { ...options, method: 'DELETE' });
  };

  request = async <T>(url: string, options?: Partial<RequestOptions<T>>): Promise<any> => {
    const defaultOpt: RequestOptions<{}> = {
      method: 'GET',
      timeout: 5000,
      data: {},
      headers: {
        accept: 'application/json',
      },
    };
    const { method, data, timeout, headers } = { ...defaultOpt, ...options };
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, `${this.baseApi}${url}`);
      xhr.withCredentials = true;
      Object.entries(headers).forEach(header => {
        const name = header[0];
        const value = header[1];

        xhr.setRequestHeader(name, value);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: parseRes(xhr.response),
            status: xhr.status,
          });
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            data: parseRes(xhr.response),
            status: xhr.status,
          });
        }
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (data.constructor.name === 'FormData') {
        xhr.send(data as FormData);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

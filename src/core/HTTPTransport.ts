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

interface RequestOptions<T> {
  method: METHODS;
  timeout: number;
  data: Record<string, T>;
  headers: Record<string, string>;
}

export default class HTTPTransport {
  get = async <T, F>(url: string, options: RequestOptions<T>): Promise<F> => {
    let query = '';
    if (options?.data) {
      query = queryStringify(options.data);
    }
    return await this.request<T>(`${url}${query}`, { ...options, method: 'GET' });
  };

  post = async <T, F>(url: string, options: RequestOptions<T>): Promise<F> => {
    return await this.request<T>(url, { ...options, method: 'POST' });
  };

  put = async <T, F>(url: string, options: RequestOptions<T>): Promise<F> => {
    return await this.request<T>(url, { ...options, method: 'PUT' });
  };

  delete = async <T, F>(url: string, options: RequestOptions<T>): Promise<F> => {
    return await this.request<T>(url, { ...options, method: 'DELETE' });
  };

  request = async <T>(url: string, options: RequestOptions<T>): Promise<any> => {
    const defaultOpt: RequestOptions<{}> = {
      method: 'GET',
      timeout: 5000,
      data: {},
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    const { method, data, timeout, headers } = { ...defaultOpt, ...options };
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      Object.entries(headers).forEach(header => {
        const name = header[0];
        const value = header[1];

        xhr.setRequestHeader(name, value);
      });

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

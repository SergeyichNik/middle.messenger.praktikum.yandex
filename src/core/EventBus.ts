export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, any[]>,
> {
  private listeners: { [key in E]?: Array<Listener<M[E]>> } = {};

  public on(event: E, callback: Listener<M[E]>): void {
    if (this.listeners[event] == null) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  public off(event: E, callback: Listener<M[E]>): void {
    if (this.listeners[event] == null) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(listener => listener !== callback);
  }

  public emit(event: E, ...args: M[E]): void {
    if (this.listeners[event] == null) {
      return;
    }

    this.listeners[event]?.forEach(function (listener) {
      listener(...args);
    });
  }
}

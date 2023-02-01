import { HTTPTransport } from '../core';

export const BASE_API = 'https://ya-praktikum.tech/api/v2/';
export const WS_API = 'wss://ya-praktikum.tech/ws/chats/';
export const api = new HTTPTransport(BASE_API);

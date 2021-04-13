import TokenService from './token-service';
import PubSub from './pubSub';
import { Ref } from 'react'

export class HttpService {

  constructor(baseApiPath) {
    this.baseApi = baseApiPath;
  }

  get baseHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    };
  }

  get formHeaders() {
    return {
      'Authorization': `Bearer ${TokenService.getToken()}`
    };
  }

  async get(path) {
    const response = await fetch(`${this.baseApi}/${path}`, { headers: this.baseHeaders });
    return this._handleResponse(response);
  }

  async post(path, body) {
    const stringifiedData = JSON.stringify(body);

    const response = await fetch(`${this.baseApi}/${path}`, {
      method: 'POST',
      body: stringifiedData,
      headers: this.baseHeaders
    });

    return this._handleResponse(response);
  }

  async patch(path, body) {
    const stringifiedData = JSON.stringify(body);
    console.log(stringifiedData);

    const response = await fetch(`${this.baseApi}/${path}`, {
      method: 'PATCH',
      body: stringifiedData,
      headers: this.baseHeaders
    });

    return this._handleResponse(response);
  }

  async postForm(path, body) {
    const response = await fetch(`${this.baseApi}/${path}`, {
      method: 'POST',
      body: body,
      headers: this.formHeaders
    });

    return this._handleResponse(response);
  }

  async delete(path) {
    const response = await fetch(`${this.baseApi}/${path}`, {
      method: 'DELETE',
      headers: this.baseHeaders
    });

    if (response.ok) {
      return;
    } else {
      throw response;
    }
  }

  async _handleResponse(response) {
    const parsedData = await response.json();

    if (response.ok) {
      return parsedData;
    }

    if (response.status === 401) {
      PubSub.emit('logout');
    }

    throw parsedData;
  }
}
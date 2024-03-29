import { faker } from "@faker-js/faker";
import { HttpPostParams, HttpPostClient } from "../protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";
import { HttpGetClient, HttpGetParams } from "../protocols/http/http-get-client";

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    value: 'any_value'
  }
});

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: {
    field: 'field_value'
  }
});

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url!: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}

import { AxiosHttpClient } from "./axios-http-client";
import { mockAxios } from '../../test/mock-axios';
import axios from "axios";
import { mockGetRequest, mockPostRequest } from "../../../data/tests/mock-http";
import { faker } from "@faker-js/faker";

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
}

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('Should call axios.post with correct url and body', async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    })

    test('Should return correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut();
      const httpResponse = await sut.post(mockPostRequest());
      const axiosResponse = await mockedAxios.post.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      });
    })
    
    test('Should return correct error on axios.post', () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response:  {
          status: faker.number.int(),
          data: { value: 'fake_value' }
        }
      })
      const httpResponse = sut.post(mockPostRequest());
      expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value);
    })
  })

  describe('get', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { headers: request.headers });
    })

    test('Should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut();
      const httpResponse = await sut.get(mockPostRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      });
    })
    
    test('Should return correct error on axios.get', async () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.get.mockRejectedValueOnce({
        response:  {
          status: 190,
          data: { value: 'fake_value_rejected' }
        }
      })
      const httpResponse = await sut.get(mockGetRequest());
      expect(httpResponse).toEqual({
        statusCode: 190,
        body: { value: 'fake_value_rejected' }
      });
    })
  })
})

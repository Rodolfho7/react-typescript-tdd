import axios from "axios";

export const mockAxios = (): jest.Mocked<typeof axios>  => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const value = {
    status: 189,
    data: { value: 'fake_value' }
  }
  mockedAxios.post.mockResolvedValue(value);
  mockedAxios.get.mockResolvedValue(value);
  return mockedAxios;
}

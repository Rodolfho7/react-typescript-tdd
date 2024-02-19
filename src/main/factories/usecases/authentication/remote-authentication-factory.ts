import { RemoteAuthentication } from '../../../../data/usecases/authentication/remote-authentication';
import { Authentication } from '../../../../domain/usecases/authentication';
import { makeApiUrl } from '../../http/api-url-factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory';

export function makeRemoteAuthentication(): Authentication {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
}

import { RemoteAddAccount } from '../../../../data/usecases/add-account/remote-add-account';
import { AddAccount } from '../../../../domain/usecases/add-account';
import { makeApiUrl } from '../../http/api-url-factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory';

export function makeRemoteAddAccount(): AddAccount {
  return new RemoteAddAccount(makeApiUrl(), makeAxiosHttpClient());
}

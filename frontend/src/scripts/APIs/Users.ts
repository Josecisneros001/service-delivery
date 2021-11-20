import type { Users as Model } from '../../interfaces/models/Users';
import { doFetch, getUrlParams } from '../APIs';

export const Users = {
  create: async (params: Model) => {
    const queryString=`users/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params, false);
  },
  get: async (is_service_provider: boolean | null) => {
    const urlParams = {
      "is_service_provider": is_service_provider ? 1 : 0,
    };
    const queryString=`users/?${getUrlParams(urlParams)}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  getById: async (id: number) => {
    const queryString=`users/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id: number) => {
    const queryString=`users/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  update: async (id: number, params: Model) => {
    const queryString=`users/${id}`;
    const methodValue='PUT';
    return await doFetch(queryString, methodValue, params);
  },
  files: async (id: number, params: FormData) => {
    const queryString=`users/${id}`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  login: async (email: string, password: string) => {
    const queryString='users/sign_in';
    const methodValue='POST';
    const params={
      "email":email,
      "password":password
    }
    return await doFetch(queryString, methodValue, params, false);
  }
};

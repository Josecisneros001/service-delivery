import type { Users as Model } from '../../interfaces/models/Users';
import { doFetch, getUrlParams } from '../APIs';

export const Users = {
  create: async (params: Model) => {
    const queryString=`users/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params, false);
  },
  get: async (is_service_provider: number | null) => {
    const urlParams = {
      "is_service_provider": is_service_provider,
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
  update: async (params: Model, id: number) => {
    const queryString=`users/${id}`;
    const methodValue='PUT';
    return await doFetch(queryString, methodValue, params);
  },
  files: async (params: FormData, id: number) => {
    const queryString=`users/files/${id}`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  login: async (email: string, password: string, is_service_provider: number) => {
    const queryString='users/sign_in';
    const methodValue='POST';
    const params={
      "email":email,
      "password":password,
      "is_service_provider": is_service_provider
    }
    return await doFetch(queryString, methodValue, params, false);
  }
};

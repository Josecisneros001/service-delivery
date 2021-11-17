import type { Users as Model } from '../../Interfaces/models/Users';
import { doFetch, getUrlParams, doLoginFetch } from '../APIs';

export const Users = {
  create: async (params: Model) => {
    const queryString=`users/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async (is_service_provider: boolean | null) => {
    const urlParams = {
      "is_service_provider": is_service_provider
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
  files: async () => {
    // TODO: FORM-DATA
    const queryString=`users/`;
    const methodValue='POST';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  login: async (email: string, password: string) => {
    const queryString='users/sign_in';
    const methodValue='POST';
    const params={
      "email":email,
      "password":password
    }
    return await doLoginFetch(queryString, methodValue, params);
  }
};

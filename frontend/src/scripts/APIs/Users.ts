import type { Users as Model } from '../../interfaces/models/Users';
import { doFetch, getUrlParams, getCurrentUser } from '../APIs';

const USER_ID = getCurrentUser();

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
  getById: async (id = USER_ID) => {
    const queryString=`users/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id = USER_ID) => {
    const queryString=`users/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  update: async (params: Model, id = USER_ID) => {
    const queryString=`users/${id}`;
    const methodValue='PUT';
    return await doFetch(queryString, methodValue, params);
  },
  files: async (params: FormData, id = USER_ID) => {
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

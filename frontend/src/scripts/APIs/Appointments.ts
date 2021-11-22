import type { Appointments as Model } from '../../interfaces/models/Appointments';
import { doFetch, getUrlParams } from '../APIs';

export const Appointments = {
  create: async (params: Model) => {
    const queryString=`appointments/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async (user_id: number | null, service_id: number | null ) => {
    const urlParams = {
      "user_id": user_id,
      "service_id": service_id
    };
    const queryString=`appointments/?${getUrlParams(urlParams)}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  getById: async (id: number) => {
    const queryString=`appointments/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id: number) => {
    const queryString=`appointments/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
};

import type { ServicePhotos as Model } from '../../Interfaces/models/ServicePhotos';
import { doFetch, getUrlParams } from '../APIs';

export const ServicePhotos = {
  create: async (params: Model) => {
    // TODO: FORM-DATA
    const queryString=`service_photos/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async (service_id: number | null) => {
    const urlParams = {
      "service_id": service_id,
    };
    const queryString=`service_photos/?${getUrlParams(urlParams)}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  getById: async (id: number) => {
    const queryString=`service_photos/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id: number) => {
    const queryString=`service_photos/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
};

import type { ServiceCategories as Model } from '../../interfaces/models/ServiceCategories';
import { doFetch } from '../APIs';

export const ServiceCategories = {
  create: async (params: Model) => {
    const queryString=`service_categories/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async () => {
    const queryString=`service_categories/`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  getById: async (id: number) => {
    const queryString=`service_categories/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id: number) => {
    const queryString=`service_categories/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
};

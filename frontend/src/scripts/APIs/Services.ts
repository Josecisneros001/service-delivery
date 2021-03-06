import type { Services as Model } from '../../interfaces/models/Services';
import { doFetch, getUrlParams } from '../APIs';

export const Services = {
  create: async (params: Model) => {
    const queryString=`services/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async (user_id: number | null,
    category_id: number | null,
    location_lat: number | null,
    location_lng: number | null,
    location_radius: number | null,
    include_info: boolean | null) => {
    const urlParams = {
			"user_id": user_id,
			"category_id": category_id,
			"location_lat": location_lat,
			"location_lng": location_lng,
			"location_radius": location_radius,
      "include_info": include_info,
    };
    const queryString=`services/?${getUrlParams(urlParams)}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  getById: async (id: number) => {
    const queryString=`services/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id: number) => {
    const queryString=`services/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  update: async (id: number, params: Model) => {
    const queryString=`services/${id}`;
    const methodValue='PUT';
    return await doFetch(queryString, methodValue, params);
  },
};

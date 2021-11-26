import type { Appointments as Model } from '../../interfaces/models/Appointments';
import { doFetch, getUrlParams } from '../APIs';

export const Appointments = {
  create: async (params: Model) => {
    const queryString=`appointments/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async (user_id: number | null, service_provider_id: number | null, service_id: number | null, include_info: boolean | null, include_info_sp: boolean | null,
      from_timestamp: string | null, to_timestamp: string | null) => {
    const urlParams = {
      "user_id": user_id,
      "service_provider_id": service_provider_id,
      "service_id": service_id,
      "include_info": include_info,
      "include_info_sp": include_info_sp,
      "from_timestamp": from_timestamp,
      "to_timestamp": to_timestamp
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

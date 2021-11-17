import type { Reviews as Model } from '../../Interfaces/models/Reviews';
import { doFetch, getUrlParams } from '../APIs';

export const Reviews = {
  create: async (params: Model) => {
    const queryString=`reviews/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async (user_sender_id: number | null,
    user_receiver_id: number | null,
    service_id: number | null,
    appointment_id: number | null) => {
    const urlParams = {
			"user_sender_id": user_sender_id,
			"user_receiver_id": user_receiver_id,
			"service_id": service_id,
			"appointment_id": appointment_id,
    };
    const queryString=`reviews/?${getUrlParams(urlParams)}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  getById: async (id: number) => {
    const queryString=`reviews/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id: number) => {
    const queryString=`reviews/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
};

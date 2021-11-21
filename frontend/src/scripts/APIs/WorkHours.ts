import type { WorkHours as Model } from '../../Interfaces/models/WorkHours';
import type { WorkHoursMultiple as MultipleModel } from '../../Interfaces/models/WorkHours';
import { doFetch, getUrlParams } from '../APIs';

export const WorkHours = {
  create: async (params: Model) => {
    const queryString=`work_hours/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
	createMultiple: async (params: MultipleModel) => {
    const queryString=`work_hours/multiple/`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async (user_id: number | null, day: number | null) => {
    const urlParams = {
      "user_id": user_id,
			"day": day
    };
    const queryString=`work_hours/?${getUrlParams(urlParams)}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  getById: async (id: number) => {
    const queryString=`work_hours/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id: number) => {
    const queryString=`work_hours/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
};

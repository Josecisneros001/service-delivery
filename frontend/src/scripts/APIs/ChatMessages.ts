import { doFetch, getUrlParams } from '../APIs';

export const ChatMessages = {
  create: async (user_sender_id: number, user_receiver_id: number, params: FormData) => {
    const urlParams = {
      "user_sender_id": user_sender_id,
			"user_receiver_id": user_receiver_id,
    };
    const queryString=`chat_messages/?${getUrlParams(urlParams)}`;
    const methodValue='POST';
    return await doFetch(queryString, methodValue, params);
  },
  get: async (lastMessages: boolean | null, user_first_id: number | null = null, user_second_id: number | null = null,
		user_sender_id: number | null = null, user_receiver_id: number | null = null,
		offset: number | null = null, limit: number | null = null) => {
    const urlParams = {
      "lastMessages": lastMessages,
      "user_first_id": user_first_id,
			"user_second_id": user_second_id,
			"user_sender_id": user_sender_id,
			"user_receiver_id": user_receiver_id,
			"offset": offset,
			"limit": limit,
    };
    const queryString=`chat_messages/?${getUrlParams(urlParams)}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  getById: async (id: number) => {
    const queryString=`chat_messages/${id}`;
    const methodValue='GET';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
  destroy: async (id: number) => {
    const queryString=`chat_messages/${id}`;
    const methodValue='DELETE';
    const params=null;
    return await doFetch(queryString, methodValue, params);
  },
};

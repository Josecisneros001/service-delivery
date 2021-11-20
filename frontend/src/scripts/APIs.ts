import cookie from 'react-cookies';

const BACK_AVAILABLE = ( process.env.REACT_APP_BACK_AVAILABLE === 'true' ? true : false ); 
const BACK_HOST_NAME = process.env.REACT_APP_BACK_API_HOST_NAME || 'http://localhost:3001/api/v1/';

export const saveUserToken = (userToken: string) => {
  cookie.save('userToken', userToken, { path: '/' });
};

export const getUrlParams = (params: any) => {
  Object.keys(params).forEach((k) => params[k] == null && delete params[k]);
  return new URLSearchParams(params).toString();
};

const handleParams = (params: any) => {
  if (!params) {
    return null;
  }
  if (params instanceof FormData) {
    return params;
  }
  return JSON.stringify(params);
};

export const doFetch = async (queryString: string,methodValue: string, params: any, tokenRequired = true) => {
  const USER_TOKEN = typeof cookie.load('userToken') === 'undefined' ? '' : cookie.load('userToken');
  
  if (!BACK_AVAILABLE || (!USER_TOKEN && tokenRequired) ) {
    return {
      status:false,
      msg:'Backend not Available.',
      data:{}
    };
  }
  return fetch(BACK_HOST_NAME + queryString, {
    method: methodValue,
    headers: {
      'access-token': USER_TOKEN,
      'Content-Type': 'application/json'
    },
    body: handleParams(params)
  }).then((response) => {
      if (response.status !== 200) {
        return false;
      } else {
        return response.json();
      }
  }).then((responseData) => {
    if (!responseData) {
      return {};
    } else {
      return responseData;
    }
  });
};

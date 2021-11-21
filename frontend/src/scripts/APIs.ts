import cookie from 'react-cookies';

const BACK_AVAILABLE = ( process.env.REACT_APP_BACK_AVAILABLE === 'true' ? true : false ); 
const BACK_HOST_NAME = process.env.REACT_APP_BACK_API_HOST_NAME || 'http://localhost:3001/api/v1/';

export const handleLogInCookies = (userId: string, userToken: string) => {
  cookie.save('userId', userId, { path: '/' });
  cookie.save('userToken', userToken, { path: '/' });
};

export const handleLogOutCookies = () => {
  cookie.remove('userId', { path: '/' });
  cookie.remove('userToken', { path: '/' });
};

export const isAuth = () : boolean => {
  const USER_TOKEN = typeof cookie.load('userToken') === 'undefined' ? '' : cookie.load('userToken');
  const USER_ID = typeof cookie.load('userId') === 'undefined' ? '' : cookie.load('userId');
  return USER_TOKEN && USER_ID;
};

export const getCurrentUser = () => {
  const USER_ID = typeof cookie.load('userId') === 'undefined' ? '' : cookie.load('userId');
  return parseInt(USER_ID);
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

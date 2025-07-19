import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'aef4d824-d894-46cb-b4de-500479dda4bb',
    authority: 'https://login.microsoftonline.com/7f7664ba-b764-47b8-887a-c7b8481fa676',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};

export const loginRequest = {
  scopes: [
    'openid',
    'profile',
    'email',
    'User.Read',
    'api://aef4d824-d894-46cb-b4de-500479dda4bb/access_as_user'
  ]
};

export const protectedResources = {
  api: {
    endpoint: 'http://localhost:9191/api',
    scopes: ['api://aef4d824-d894-46cb-b4de-500479dda4bb/access_as_user']
  }
};

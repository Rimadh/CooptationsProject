export const environment = {
  production: false,
  azure: {
    clientId: 'd4efc922-dca4-401c-94f7-69e04488c83a',
    authority: 'https://login.microsoftonline.com/7f7664ba-b764-47b8-887a-c7b8481fa676',
    redirectUri: 'http://localhost:4200/auth-callback',
    scopes: ['openid', 'profile', 'email']
  }
};
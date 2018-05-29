const _isDev = window.location.port.indexOf('4200') > -1;
const apiURI = 'http://localhost:3000/api/';
export const ENV = {
    BASE_API: apiURI
};
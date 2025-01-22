export const PUBLIC_ROUTES = [
  '/',
  '/auth/new-verification',
  /^\/invoice\/([^/]+)\/payment$/,
];

export const AUTH_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
];

export const DEFAULT_REDIRECT = '/dashboard';

export const API_AUTH_PREFIX = '/api/auth';

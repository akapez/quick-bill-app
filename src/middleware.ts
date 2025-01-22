import { NextResponse } from 'next/server';

import authConfig from '@lib/auth.config';
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_REDIRECT,
  PUBLIC_ROUTES,
} from '@lib/routes';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) =>
    route instanceof RegExp ? route.test(pathname) : route === pathname
  );
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute(nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

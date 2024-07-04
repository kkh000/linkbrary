import { NextResponse, NextRequest } from 'next/server';

import getCookieForServer from './utils/apis/getCookieForServer';

export function middleware(request: NextRequest) {
  const isAuthenticated = getCookieForServer('accessToken', request);

  const unauthenticatedRoutes = ['/', '/signin', '/signup'];
  const protectedRoutes = ['/folder'];

  if (isAuthenticated) {
    if (unauthenticatedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/folder/all', request.url));
    }
  }
  if (!isAuthenticated) {
    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signin', '/signup', '/folder/:path*'],
};

import { NextResponse, NextRequest } from 'next/server';

import getCookieForServer from './utils/getCookieForServer';

export function middleware(request: NextRequest) {
  const isAuthenticated = getCookieForServer('accessToken', request);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/signin', request.url));
}

export const config = {
  matcher: ['/folder'],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get('app_session')?.value;
  const { pathname } = request.nextUrl;

  if (pathname === '/login' || pathname.includes('/policies')) {
    return NextResponse.next();
  }

  if (!sessionToken || sessionToken !== process.env.AUTH_COOKIE_VALUE) {
    if (pathname.startsWith('/sync')) {
      return NextResponse.json({}, { status: 401 });
    }

    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();

  if (sessionToken) {
    response.cookies.set('app_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Number(process.env.AUTH_SESSION_TIME || 60 * 60),
      path: '/',
    });
  }

  return response;
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

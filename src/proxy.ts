import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  console.log('PROXY HIT:', req.nextUrl.pathname);

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const expectedPassword = process.env.COVER_LETTER_PASSWORD;

    // We can allow any username, as long as the password matches.
    // Or you can enforce a specific username (e.g., 'admin').
    if (pwd === expectedPassword) {
      return NextResponse.next();
    }
  }

  // If unauthorized, return 401 and WWW-Authenticate header to trigger the browser's native login prompt
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Only run this middleware on the /lab/cover-letter route and its sub-routes
export const config = {
  matcher: ['/lab/cover-letter', '/lab/cover-letter/:path*'],
};

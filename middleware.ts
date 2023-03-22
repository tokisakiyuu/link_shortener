import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/api')) {
    const resHeaders = new Headers()
    resHeaders.set('Content-Type', 'text/plain; charset=utf-8')
    return NextResponse.next({
      headers: resHeaders
    })
  }
}

export const config = {
  matcher: ['/api/:path*'],
}
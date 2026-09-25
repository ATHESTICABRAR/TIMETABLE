import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

const protectedRoutes = ['/dashboard', '/calendar', '/statistics', '/habits', '/settings']
const publicRoutes = ['/login', '/register', '/']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  const session = request.cookies.get('session')?.value
  let parsedSession = null
  if (session) {
    try {
      parsedSession = await decrypt(session)
    } catch(e) {
      // Invalid session
    }
  }

  if (isProtectedRoute && !parsedSession) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isPublicRoute && parsedSession && path !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of protected routes
const protectedRoutes = ["/dashboard", "/dashboard/create"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAccount = request.cookies.get("userAccount")?.value;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to home if trying to access protected route without auth
  if (isProtectedRoute && !userAccount) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

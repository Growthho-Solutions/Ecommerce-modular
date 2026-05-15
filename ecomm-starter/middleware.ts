import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/customer-auth";

export async function middleware(request: NextRequest) {
  // 1. Update Customer Session (Storefront)
  const sessionResponse = await updateSession(request);
  
  // 2. Simple Rate Limiting for sensitive routes
  const sensitiveRoutes = ["/app/actions/auth", "/app/actions/checkout"];
  const isSensitive = sensitiveRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isSensitive) {
    // In a real prod environment, use Upstash Redis here.
    // For now, we'll just ensure basic security headers.
  }

  const response = sessionResponse || NextResponse.next();
  
  // Add Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

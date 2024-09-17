import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export const middleware = async (req: NextRequest, event: any) => {
  // Custom middleware logic for checking the "auth" cookie
  const cookie = req.cookies.get("auth");

  if (!cookie) {
    return NextResponse.redirect("/login");
  }

  // Call Clerk's authMiddleware if the "auth" cookie exists
  const authResponse = await authMiddleware({
    publicRoutes: ["/api/webhook/clerk"],
    ignoredRoutes: ["/api/webhook/clerk"],
  })(req, event); // Pass both req and event as arguments

  // Return the auth response (either allow access or redirect based on Clerk's logic)
  return authResponse;
};

// Configuration for route matching
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

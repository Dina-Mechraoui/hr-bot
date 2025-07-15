import { NextResponse } from "next/server";
import { authenticated } from "./_lib/session";

export default async function middleware(req) {
  const { nextUrl, cookies } = req;
  const path = nextUrl.pathname;
  const response = NextResponse.next();

  const accessToken = cookies.get("access")?.value;
  const refreshToken = cookies.get("refresh")?.value;
  const role = cookies.get("role")?.value;
  const profileReview = cookies.get("profile_review")?.value;
  const userDataCookie = cookies.get("user")?.value;
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;

  const hasPersonalProfile = true;

  const requiresAuth = (pathname) => pathname.startsWith("/auth");
  const isCandidateInvite = path.startsWith("/invite/");

  // Redirect unauthenticated users visiting /invite/[slug]
  if (isCandidateInvite && !accessToken) {
    const redirectToLogin = new URL("/login", req.url);
    redirectToLogin.searchParams.set("redirect", path);
    return NextResponse.redirect(redirectToLogin);
  }

  // If tokens exist, check session
  if (accessToken && role) {
    try {
      const user = await authenticated(accessToken, refreshToken);

      if (typeof user === "string") {
        response.cookies.set("access", user); // token was refreshed
      }

      if (user) {
        if (isCandidateInvite) {
          if (role === "Candidate") {
            const slug = path.split("/invite/")[1];
            return NextResponse.redirect(
              new URL(`/auth/Candidate/Dashboard/posts/${slug}`, req.url)
            );
          } else {
            return NextResponse.redirect(new URL("/auth/Not-Reviewed", req.url));
          }
        }

        // --- Admin ---
        if (role === "Admin") {
          if (path === "/" || path.startsWith("/auth/Admin/Dashboard")) {
            return response;
          } else {
            return NextResponse.redirect(new URL("/auth/Admin/Dashboard", req.url));
          }
        }

        // --- Candidate ---
        if (role === "Candidate") {
          if (!hasPersonalProfile && path !== "/auth") {
            return NextResponse.redirect(new URL(`/auth/${role}/Dashboard`, req.url));
          }

          if (
            requiresAuth(path) &&
            !path.includes(role) &&
            path !== `/auth/${role}/Dashboard` &&
            path !== "/" &&
            hasPersonalProfile
          ) {
            return NextResponse.redirect(new URL(`/auth/${role}/Dashboard`, req.url));
          }

          if (path === "/auth/Not-Reviewed" && hasPersonalProfile) {
            return NextResponse.redirect(new URL(`/auth/${role}/Dashboard`, req.url));
          }
        }

        // --- Recruiter ---
        if (role === "Recruiter") {
          if (
            (profileReview === "Pending" || profileReview === "Rejected") &&
            path !== "/auth/Not-Reviewed"
          ) {
            return NextResponse.redirect(new URL("/auth/Not-Reviewed", req.url));
          }

          if (
            (!profileReview ||
              profileReview === "Rejected" ||
              profileReview === undefined ||
              profileReview === null) &&
            path !== "/auth/Not-Reviewed"
          ) {
            return NextResponse.redirect(new URL("/auth/Not-Reviewed", req.url));
          }
        }

        // Block access to invite page if not Candidate
        if (isCandidateInvite && role !== "Candidate") {
          return NextResponse.redirect(new URL("/auth/Not-Reviewed", req.url));
        }

        // Redirect away from login/register if already logged in
        if (
          path.includes("login") ||
          (path.includes("register") && profileReview === "Accepted")
        ) {
          return NextResponse.redirect(new URL(`/auth/${role}/Dashboard`, req.url));
        }

        // Accepted profile = redirect to dashboard
        if (path === "/auth") {
          return profileReview === "Accepted"
            ? NextResponse.redirect(new URL(`/auth/${role}/Dashboard`, req.url))
            : NextResponse.redirect(new URL("/auth/Not-Reviewed", req.url));
        }

        return response;
      } else {
        if (requiresAuth(path)) {
          return NextResponse.redirect(new URL("/register", req.url));
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      if (requiresAuth(path)) {
        return NextResponse.redirect(new URL("/register", req.url));
      }
    }
  } else {
    // No access token → redirect if auth required
    if (requiresAuth(path)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ✅ All good
  return response;
}

// Match all routes except static/image assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
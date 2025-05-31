import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
import { authenticated } from "./_lib/session";

export default async function middleware(req) {
  console.log("Middleware invoked");

  const { nextUrl, cookies } = req;
  const path = nextUrl.pathname;
  const response = NextResponse.next();

  const accessToken = cookies.get("access")?.value;
  const refreshToken = cookies.get("refresh")?.value;
  const role = cookies.get("role")?.value;
  const profileReview = cookies.get("profile_review")?.value;
  const userDataCookie = cookies.get("user")?.value;
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  const hasPersonalProfile = true

  const requiresAuth = (pathname) => pathname.startsWith("/auth");

  if (accessToken && role) {
    try {
      const user = await authenticated(accessToken, refreshToken);
      if (typeof user === "string") {
        response.cookies.set("access", user);
      }

      if (user) {
        if (role === "Admin") {
          if (
            path === "/" ||
            path === "/auth/Admin/Dashboard"
          ) {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(
              new URL("/auth/Admin/Dashboard", req.url)
            );
          }
        }

        if (role === "Candidate") {
          console.log("Candidate role detected");
          if (!hasPersonalProfile && path !== "/auth") {
            console.log('here?')
            return NextResponse.redirect(new URL(`/auth/${role}/Dashboard`, req.url));
          }

          if (
            requiresAuth(path) &&
            !path.includes(role) &&
            path !== `/auth/${role}/Dashboard` &&
            path !== "/" &&
            hasPersonalProfile
          ) {
            console.log("Redirecting to Candidate Dashboard");
            return NextResponse.redirect(
              new URL(`/auth/${role}/Dashboard`, req.url)
            );
          }

          if (path === "auth/Not-Reviewed" && hasPersonalProfile) {
            return NextResponse.redirect(
              new URL(`/auth/${role}/Dashboard`, req.url)
            );
          }
          
        }

        if (role === "Recruiter") {
          // if (!hasPersonalProfile && path !== "/auth") {
          //   return NextResponse.redirect(new URL("/auth", req.url));
          // }

          if (
            (profileReview === "Pending" || profileReview === "Rejected") &&
            path !== "/auth/Not-Reviewed"
          ) {
            return NextResponse.redirect(
              new URL("/auth/Not-Reviewed", req.url)
            );
          }

          if (
            (!profileReview ||
              profileReview === "Rejected" ||
              profileReview === undefined ||
              profileReview === null) &&
            path !== "/auth/Not-Reviewed"
          ) {
            return NextResponse.redirect(
              new URL("/auth/Not-Reviewed", req.url)
            );
          }
        }

        // Restrict access to other role routes within auth
        if (
          path.includes("login") ||
          (path.includes("register") &&
            profileReview === "Accepted")
        ) {
          return NextResponse.redirect(
            new URL(`/auth/${role}/Dashboard`, req.url)
          );
        }

        if ((path === "/auth") || hasPersonalProfile) {
          profileReview === "Accepted"
            ? NextResponse.redirect(new URL(`/auth/${role}/Dashboard`, req.url))
            : NextResponse.redirect(new URL("/auth/Not-Reviewed", req.url));
        }

        if (
          requiresAuth(path) &&
          !path.includes(role) &&
          path !== `/auth/${role}/Dashboard` &&
          (hasPersonalProfile) &&
          profileReview === "Accepted"
        ) {
          return NextResponse.redirect(
            new URL(`/auth/${role}/Dashboard`, req.url)
          );
        }

        return response;
      } else {
        // Refresh token failed; redirect to login if auth is required
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
    // Redirect unauthenticated users if auth is required
    if (requiresAuth(path)) {
      console.log("Redirecting unauthenticated request to login.");
      console.log("Path:", path);
      console.log(req.url);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

    // if (path === "/companies") {
    //   return NextResponse.next();
    // }

    console.log("Request passed middleware without issues.");
    return response;
  }

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

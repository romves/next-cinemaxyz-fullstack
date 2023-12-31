import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { payload }: any = await jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret!)
    );
    const headers = new Headers(request.headers)

    headers.set('userId', `${payload.userId}`)

    return NextResponse.next({
      request: {
        headers
      }
    })

  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: ["/api/user/me", "/api/booking","/api/user/topup", "/api/user/withdraw", "/api/user/order-history"]
};

<<<<<<< HEAD
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_auth", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}
=======
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_auth", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}
>>>>>>> 67886b3d4e54dfae9e1864a230271ec22ed9722b

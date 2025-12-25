<<<<<<< HEAD
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  const auth = (await cookies()).get("admin_auth");
  if (!auth) return NextResponse.json({ success: false }, { status: 401 });

  const [[row]] = await db.query("SELECT * FROM seo_settings WHERE id=1");
  return NextResponse.json({ success: true, data: row });
}

export async function POST(req) {
  const auth = (await cookies()).get("admin_auth");
  if (!auth) return NextResponse.json({ success: false }, { status: 401 });

  const { meta_title, meta_description, meta_keywords } = await req.json();

  await db.query(
    "UPDATE seo_settings SET meta_title=?, meta_description=?, meta_keywords=? WHERE id=1",
    [meta_title, meta_description, meta_keywords]
  );

  return NextResponse.json({ success: true });
}


=======
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  const auth = (await cookies()).get("admin_auth");
  if (!auth) return NextResponse.json({ success: false }, { status: 401 });

  const [[row]] = await db.query("SELECT * FROM seo_settings WHERE id=1");
  return NextResponse.json({ success: true, data: row });
}

export async function POST(req) {
  const auth = (await cookies()).get("admin_auth");
  if (!auth) return NextResponse.json({ success: false }, { status: 401 });

  const { meta_title, meta_description, meta_keywords } = await req.json();

  await db.query(
    "UPDATE seo_settings SET meta_title=?, meta_description=?, meta_keywords=? WHERE id=1",
    [meta_title, meta_description, meta_keywords]
  );

  return NextResponse.json({ success: true });
}


>>>>>>> 67886b3d4e54dfae9e1864a230271ec22ed9722b

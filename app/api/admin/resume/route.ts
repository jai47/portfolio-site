import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { getResumeUrl, setResumeUrl } from "@/lib/settings";

async function requireAdmin() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const resumeUrl = await getResumeUrl();
    return NextResponse.json({ resumeUrl });
  } catch (error) {
    console.error("Admin resume GET error:", error);
    return NextResponse.json(
      { error: "Failed to load resume URL" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { resumeUrl } = await request.json();
    if (typeof resumeUrl !== "string") {
      return NextResponse.json({ error: "resumeUrl required" }, { status: 400 });
    }

    const trimmed = resumeUrl.trim();
    if (trimmed) {
      try {
        const parsed = new URL(trimmed);
        if (!["http:", "https:"].includes(parsed.protocol)) {
          return NextResponse.json(
            { error: "Resume URL must start with http:// or https://" },
            { status: 400 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Enter a valid URL" },
          { status: 400 }
        );
      }
    }

    const saved = await setResumeUrl(trimmed);
    return NextResponse.json({ resumeUrl: saved });
  } catch (error) {
    console.error("Admin resume PUT error:", error);
    return NextResponse.json(
      { error: "Failed to save resume URL" },
      { status: 500 }
    );
  }
}

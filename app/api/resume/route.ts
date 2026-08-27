import { NextResponse } from "next/server";
import { getResumeUrl } from "@/lib/settings";

export async function GET() {
  try {
    const resumeUrl = await getResumeUrl();
    return NextResponse.json({ resumeUrl });
  } catch (error) {
    console.error("Resume fetch error:", error);
    return NextResponse.json({ resumeUrl: "" }, { status: 200 });
  }
}

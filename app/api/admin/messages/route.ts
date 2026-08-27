import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import {
  deleteMessage,
  getMessageStats,
  getMessages,
  updateMessage,
} from "@/lib/db";

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

  const [messages, stats] = await Promise.all([
    getMessages(),
    getMessageStats(),
  ]);

  return NextResponse.json({ messages, stats });
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id, read } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Message id required" }, { status: 400 });
  }

  const updated = await updateMessage(id, { read: Boolean(read) });
  if (!updated) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json({ message: updated });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Message id required" }, { status: 400 });
  }

  const deleted = await deleteMessage(id);
  if (!deleted) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

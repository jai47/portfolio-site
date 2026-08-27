import { promises as fs } from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readMessagesFile(): Promise<ContactMessage[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw) as ContactMessage[];
  } catch {
    return [];
  }
}

async function writeMessagesFile(messages: ContactMessage[]) {
  await ensureDataDir();
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

export async function getMessages(): Promise<ContactMessage[]> {
  const messages = await readMessagesFile();
  return messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  const messages = await readMessagesFile();
  const entry: ContactMessage = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.unshift(entry);
  await writeMessagesFile(messages);
  return entry;
}

export async function updateMessage(
  id: string,
  updates: Partial<Pick<ContactMessage, "read">>
): Promise<ContactMessage | null> {
  const messages = await readMessagesFile();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return null;
  messages[index] = { ...messages[index], ...updates };
  await writeMessagesFile(messages);
  return messages[index];
}

export async function deleteMessage(id: string): Promise<boolean> {
  const messages = await readMessagesFile();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) return false;
  await writeMessagesFile(filtered);
  return true;
}

export async function getMessageStats() {
  const messages = await readMessagesFile();
  return {
    total: messages.length,
    unread: messages.filter((m) => !m.read).length,
  };
}

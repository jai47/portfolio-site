import { getDb } from "./mongodb";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const COLLECTION = "messages";

interface MessageDoc {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

function toMessage(doc: MessageDoc): ContactMessage {
  return {
    id: doc._id,
    name: doc.name,
    email: doc.email,
    message: doc.message,
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : String(doc.createdAt),
    read: doc.read,
  };
}

async function messagesCollection() {
  const db = await getDb();
  return db.collection<MessageDoc>(COLLECTION);
}

export async function getMessages(): Promise<ContactMessage[]> {
  const col = await messagesCollection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toMessage);
}

export async function addMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  const col = await messagesCollection();
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const doc: MessageDoc = {
    _id: id,
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
    createdAt,
    read: false,
  };
  await col.insertOne(doc);
  return toMessage(doc);
}

export async function updateMessage(
  id: string,
  updates: Partial<Pick<ContactMessage, "read">>
): Promise<ContactMessage | null> {
  const col = await messagesCollection();
  const result = await col.findOneAndUpdate(
    { _id: id },
    { $set: { ...updates } },
    { returnDocument: "after" }
  );
  return result ? toMessage(result) : null;
}

export async function deleteMessage(id: string): Promise<boolean> {
  const col = await messagesCollection();
  const result = await col.deleteOne({ _id: id });
  return result.deletedCount === 1;
}

export async function getMessageStats() {
  const col = await messagesCollection();
  const [total, unread] = await Promise.all([
    col.countDocuments(),
    col.countDocuments({ read: false }),
  ]);
  return { total, unread };
}

import { getDb } from "./mongodb";

const COLLECTION = "settings";
const SITE_ID = "site";

interface SiteSettingsDoc {
  _id: string;
  resumeUrl: string;
  updatedAt?: Date;
}

export async function getResumeUrl(): Promise<string> {
  const db = await getDb();
  const doc = await db
    .collection<SiteSettingsDoc>(COLLECTION)
    .findOne({ _id: SITE_ID });
  return doc?.resumeUrl ?? "";
}

export async function setResumeUrl(resumeUrl: string): Promise<string> {
  const db = await getDb();
  await db.collection<SiteSettingsDoc>(COLLECTION).updateOne(
    { _id: SITE_ID },
    { $set: { resumeUrl, updatedAt: new Date() } },
    { upsert: true }
  );
  return resumeUrl;
}
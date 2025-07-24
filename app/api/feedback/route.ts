import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FEEDBACK_FILE = path.join(process.cwd(), "feedback.json");

export async function POST(request: Request) {
  const { email, feedback } = await request.json();
  let data: any[] = [];
  try {
    if (fs.existsSync(FEEDBACK_FILE)) {
      data = JSON.parse(fs.readFileSync(FEEDBACK_FILE, "utf8"));
    }
  } catch {}
  data.push({ email, feedback, date: new Date().toISOString() });
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}

export async function GET() {
  let data: any[] = [];
  try {
    if (fs.existsSync(FEEDBACK_FILE)) {
      data = JSON.parse(fs.readFileSync(FEEDBACK_FILE, "utf8"));
    }
  } catch {}
  return NextResponse.json(data);
}
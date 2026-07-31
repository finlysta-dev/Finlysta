import { NextRequest, NextResponse } from "next/server";
import { runAggregator } from "@/lib/aggregator/run";

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summaries = await runAggregator();
    return NextResponse.json({ success: true, summaries });
  } catch (error) {
    console.error("Aggregator run failed:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

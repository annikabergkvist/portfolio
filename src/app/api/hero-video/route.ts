import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const FILE_RELATIVE_PATH = path.join("public", "videos", "bg3-1280.mp4");

function parseRangeHeader(range: string, size: number) {
  // Expected: "bytes=start-end"
  const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!m) return null;

  const startRaw = m[1];
  const endRaw = m[2];

  let start = startRaw === "" ? NaN : Number(startRaw);
  let end = endRaw === "" ? NaN : Number(endRaw);

  // bytes=-N (suffix)
  if (Number.isNaN(start) && !Number.isNaN(end)) {
    const suffixLength = end;
    if (suffixLength <= 0) return null;
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  }

  // bytes=N- (open end)
  if (!Number.isNaN(start) && Number.isNaN(end)) {
    end = size - 1;
  }

  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  if (start < 0 || end < 0 || start > end) return null;
  if (start >= size) return null;

  end = Math.min(end, size - 1);
  return { start, end };
}

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), FILE_RELATIVE_PATH);
  const { size } = await stat(filePath);

  const range = req.headers.get("range");
  if (!range) {
    const stream = createReadStream(filePath);
    return new Response(stream as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": String(size),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const parsed = parseRangeHeader(range, size);
  if (!parsed) {
    return new Response(null, {
      status: 416,
      headers: {
        "Content-Range": `bytes */${size}`,
        "Accept-Ranges": "bytes",
      },
    });
  }

  const { start, end } = parsed;
  const chunkSize = end - start + 1;
  const stream = createReadStream(filePath, { start, end });

  return new Response(stream as unknown as BodyInit, {
    status: 206,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(chunkSize),
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}


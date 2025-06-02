import { serve } from "https://deno.land/std/http/server.ts";
import { join, extname } from "https://deno.land/std/path/mod.ts";
import { contentType } from "https://deno.land/std/media_types/mod.ts";

const DIST_DIR = join(Deno.cwd(), "dist"); // Ensure this points to your build output folder
const ASSETS_DIR = join(DIST_DIR, "assets"); // Assuming your assets are in dist/assets

async function handler(req) {
  const url = new URL(req.url);
  let filePath = join(DIST_DIR, url.pathname);

  // Serve static files like JS, CSS, and other assets
  if (url.pathname.startsWith("/assets/")) {
    // Resolve the file path to the assets folder
    filePath = join(ASSETS_DIR, url.pathname.replace('/assets/', '/'));

    try {
      const file = await Deno.readFile(filePath);
      const mimeType = contentType(extname(filePath)) || "application/octet-stream";
      return new Response(file, {
        headers: {
          "content-type": mimeType,
        },
      });
    } catch (error) {
      return new Response("404 Not Found", { status: 404 });
    }
  }

  // For non-static routes, fallback to index.html for React Router
  try {
    const file = await Deno.readFile(join(DIST_DIR, "index.html"));
    return new Response(file, { headers: { "Content-Type": "text/html" } });
  } catch (error) {
    return new Response("404 Not Found", { status: 404 });
  }
}

serve(handler);

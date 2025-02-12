import { serveDir, serveFile } from "jsr:@std/http/file-server";
import path from "node:path";

const rootDir = Deno.cwd();
const STATIC_FOLDER_NAME = "static";
const BASE_FOLDER_NAME = "routes";

const STATIC_FOLDER_DIR = path.join(rootDir);
const FILE_DIR = path.join(rootDir, "src", "server", BASE_FOLDER_NAME);

export async function handleRoutes(req: Request): Promise<Response> {
  const fileRoute = await createFileRoute(req);

  if (fileRoute.isStaticRoute) {
    return serveDir(req, { fsRoot: STATIC_FOLDER_DIR });
  }

  if (!fileRoute.isValid) {
    const file = await Deno.readTextFile(path.join(FILE_DIR, "404.html"));
    return new Response(file, {
      status: 404,
      headers: { "content-type": "text/html" },
    });
  }

  return serveFile(req, fileRoute.filePath);
}

type FileRoute = {
  isStaticRoute: boolean;
  isValid: boolean;
  filePath: string;
};

async function createFileRoute(req: Request): Promise<FileRoute> {
  const url = new URL(req.url);
  const isStaticRoute = url.pathname.split("/")[1] === STATIC_FOLDER_NAME;

  const isDirectory = url.pathname.endsWith("/");

  const filePath = isDirectory
    ? path.join(FILE_DIR, url.pathname, "index.html")
    : path.join(FILE_DIR, url.pathname);

  return {
    isStaticRoute,
    isValid: await isFile(filePath),
    filePath,
  };
}

async function isFile(path: string): Promise<boolean> {
  try {
    await Deno.lstat(path);
    return true;
  } catch (_) {
    return false;
  }
}

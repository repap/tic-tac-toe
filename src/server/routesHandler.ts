import { serveDir, serveFile } from "jsr:@std/http/file-server";
import path from "node:path";

const STATIC_FOLDER = 'static'
const BASE_FOLDER = 'routes'
const dirname = import.meta.dirname || ''


export async function handleRoutes(req: Request): Promise<Response> {
  const fileRoute = await createFileRoute(req)
  
  if(fileRoute.isStaticRoute) {
    console.log(fileRoute.staticDirectory)
    return serveDir(req, { fsRoot: fileRoute.staticDirectory })
  }

  if(!fileRoute.isValid) {
    const file = await Deno.readTextFile(path.join(dirname, 'routes','404.html'))
    return new Response(file, {status: 404, headers: {'content-type': 'text/html'}})
  }

  return serveFile(req, fileRoute.filePath)

}

type FileRoute = {
  isStaticRoute: boolean,
  isValid: boolean,
  filePath: string,
  staticDirectory: string
}

async function createFileRoute(req: Request): Promise<FileRoute> {
  const staticDirectory = path.join(dirname, '..', '..')
  const baseDirtectory = path.join(dirname, BASE_FOLDER)
  
  const url = new URL(req.url)
  const isStaticRoute = url.pathname.split('/')[1] === (STATIC_FOLDER)

  const isDirectory = url.pathname.endsWith('/');
  
  const filePath = isDirectory 
    ? path.join(baseDirtectory, url.pathname, 'index.html') 
    : path.join(baseDirtectory, url.pathname);

  return {
    isStaticRoute,
    isValid: await isFile(filePath),
    filePath,
    staticDirectory,
  };
}

async function isFile(path:string): Promise<boolean> {
  try {
    await Deno.lstat(path);
    return true
  } catch (_) {
    return false
  }
}
import { serveDir, serveFile } from "jsr:@std/http/file-server";


import path from "node:path";

const STATIC_FOLDER = '/static'
const dirname = import.meta.dirname || ''


export async function handleRoutes(req: Request): Promise<Response> {
  const fileRoute = await createFileRoute(req)
  
  console.log(fileRoute.isStaticRoute)
  console.log(fileRoute.staticDirectory)
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
  
  const route = new URL(req.url).pathname;
  const isStaticRoute = route.startsWith(STATIC_FOLDER);
  
  const isDirectory = route.endsWith('/');
  
  const basePath = path.join(dirname, 'routes')

  const filePath = isDirectory 
  ? path.join(basePath, route, 'index.html') 
  : path.join(basePath, route);

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
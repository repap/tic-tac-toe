import path from "node:path";

export async function handleHtmlRequest(req: Request): Promise<Response> {

  const dirname = import.meta.dirname || ''
  const staticFolderPath = path.join(dirname, '..', '..', 'static')
  const route = req.url.split('/')[1] || ''
  const filePath = path.join(staticFolderPath, route, 'index.html')

  console.log(staticFolderPath)
  console.log(route)
  console.log(filePath)

  try {
    if (!req.url.endsWith('/')) {
      throw new Error()
    }

    const html = await Deno.readTextFileSync(filePath)
    return new Response(
      html,
      { headers: { 'content-type': 'text/html' } }
    )
  } catch (_) {
    const filePath = path.join(staticFolderPath, '404.html')
    const html = await Deno.readTextFileSync(filePath)
    return new Response(
      html,
      { headers: { 'content-type': 'text/html' } }
    )
  }
}
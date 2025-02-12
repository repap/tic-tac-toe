import { handleRoutes } from "./routesHandler.ts";
import { handleWebsocket } from "./websocketHandler.ts";

Deno.serve({ port: 3000 }, (req) => {
  console.log("request received: ", req.url, req.method, req.headers);

  if (req.headers.get("upgrade") === "websocket") {
    return handleWebsocket(req);
  }

  return handleRoutes(req);
});

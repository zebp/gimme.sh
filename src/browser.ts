import { WebRouter } from "@zebp/routy";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import homePage from "./index.html";

class BrowserRouter extends WebRouter {
  notFound(): Response {
    return new Response("", {
      status: 301,
      headers: { Location: "/" },
    });
  }
}

export const router = new BrowserRouter().get(
  "/",
  () =>
    new Response(homePage, {
      headers: {
        "content-type": "text/html",
        "cache-control": "max-age=604800",
      },
    }),
);

import { WebRouter } from "@zebp/routy";
import { packageMap } from "./packages";
import { isProbablyABrowser, notFoundResponse, notRedirect } from "./util";
import { router as browserRouter } from "./browser";

const router = new WebRouter().get("/:package", (_request, _data, ctx) => {
  const { package: name } = ctx.params;
  const packageData = packageMap.get(name.toLowerCase());

  console.log({ ...packageData, name });

  if (packageData === undefined) {
    return notFoundResponse(name);
  }

  return new Response(notRedirect, {
    status: 302,
    headers: { Location: packageData.url },
  });
});

export default {
  async fetch(request: Request): Promise<Response> {
    if (isProbablyABrowser(request)) {
      return browserRouter.route(request);
    }

    return router.route(request);
  },
};

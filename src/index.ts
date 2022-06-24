import { WebRouter } from "@zebp/routy";
import { packageMap } from "./packages";
import { notFoundResponse, notRedirect } from "./util";

const router = new WebRouter().get("/:package", (_request, _data, ctx) => {
  const { package: name } = ctx.params;
  const packageData = packageMap.get(name.toLowerCase());

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
    return router.route(request);
  },
};

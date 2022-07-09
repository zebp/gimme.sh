import { Chalk } from "chalk";

const chalk = new Chalk({
  level: 3,
});

function wrapInEcho(text: string) {
  return `echo -e "${text}"`;
}

export function textAsResponse(text: string, status: number) {
  return new Response(wrapInEcho(text), { status });
}

export function notFoundResponse(name: string) {
  return textAsResponse(
    "\n " +
      chalk.red("✗") +
      " Error!\n" +
      "   Package " +
      chalk.hex("#FF00FF").bold(name) +
      " is not on https://gimme.sh/" +
      "\n\n" +
      "   If you'd like it to be, please make a PR to\n   " +
      chalk.hex("#FFFFFF").underline("https://github.com/zebp/gimme.sh") +
      "\n",
    404,
  );
}

export const notRedirect = wrapInEcho(
  "\n " +
    chalk.red("✗") +
    ` If you're seeing this you forgot the ${chalk.bold.white("-L")} flag\n   to follow the redirect!\n`,
);

export function isProbablyABrowser(req: Request): boolean {
  const userAgent = req.headers.get("accept");
  if (userAgent === null) return true;
  return userAgent.includes("text/html");
}

import { Chalk } from "chalk";

const chalk = new Chalk({
  level: 3,
});

const wrapInEcho = (text: string) => `echo -e "${text}"`;
export const textAsResponse = (text: string, status: number) => new Response(wrapInEcho(text), { status });

export const notFoundResponse = (name: string) =>
  textAsResponse(
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

export const notRedirect = wrapInEcho(
  "\n " +
    chalk.red("✗") +
    ` If you're seeing this you forgot the ${chalk.bold.white("-L")} flag\n   to follow the redirect!\n`,
);

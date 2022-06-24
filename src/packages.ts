import packages from "./packages.json";

// TODO(zeb): Support versions?
// TODO(zeb): Support Windows
export interface Package {
  /**
   * The names of the package that can be used as a suffix for the URL that'll redirect to the
   * proper install script.
   */
  names: string[];
  /**
   * The URL to an install script for the package.
   */
  url: string;
}

export const packageMap: Map<string, Package> = new Map();

packages.forEach((item) =>
  item.names.forEach((alias) => {
    packageMap.set(alias.toLowerCase(), item);
  }),
);

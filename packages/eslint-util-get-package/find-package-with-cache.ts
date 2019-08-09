import { join } from 'path';

import { sync as findUpSync } from 'find-up';

import { findUpWithCache } from './find-up-with-cache';

const getPackagePath = (directory: string) => join(directory, 'package.json');

const matchPackage = (directory: string) => {
  const packagePath = getPackagePath(directory);
  return findUpSync.exists(directory) ? packagePath : undefined;
};

export function findPackageWithCache(cwd: string) {
  const packagePath = findUpWithCache(matchPackage, { cwd });
  if (!packagePath) return undefined;

  // `require` itself is cached
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJSON = require(packagePath);

  if (!packageJSON && typeof packageJSON.name !== 'string')
    throw new TypeError(`'${packagePath}' is invalid.`);

  return packageJSON;
}
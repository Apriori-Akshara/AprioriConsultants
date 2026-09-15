import path from 'node:path';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    const cleanSpecifier = specifier.split('?')[0].split('#')[0];
    if (!path.extname(cleanSpecifier)) {
      try {
        return await nextResolve(`${specifier}.js`, context);
      } catch {
        // Fall through to the standard resolver so real errors remain visible.
      }
    }
  }

  return nextResolve(specifier, context);
}

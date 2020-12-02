require('@babel/register')({
  ignore: ['node_modules/*']
});

const noop = function () {};
for (const ignoredExtension of ['.css', '.svg']) {
  require.extensions[ignoredExtension] = noop;
}
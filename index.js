const { readFileSync } = require('fs');
const { extname } = require('path');
const postcss = require('postcss');
const postcssrc = require('postcss-load-config');
const { PurgeCSS } = require('purgecss');
const { createFilter } = require('rollup-pluginutils');

module.exports = function tailwind(options = {}) {
  const filter = createFilter(options.input);
  const ctx = { env: process.env.ROLLUP_WATCH ? 'development' : 'production' };
  let css;

  return {
    name: 'tailwind',

    async transform(_, id) {
      if (!filter(id)) return;

      const code = readFileSync(id);
      const { plugins, options } = await postcssrc(ctx);

      ({ css } = await postcss(plugins).process(code, {
        ...options,
        from: undefined,
      }));
    },

    async generateBundle(opts, bundle) {
      if (!css) return;

      let source = css;

      if (options.purge) {
        const result = await new PurgeCSS().purge({
          css: [{ raw: css }],
          content: Object.values(bundle)
            .filter(chunkOrAsset => chunkOrAsset.type === 'chunk')
            .map(({ code, fileName }) => ({
              raw: code,
              extension: extname(fileName).substring(1),
            })),
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          whitelist: ['html', 'body'],
        });

        source = result.reduce((acc, purge) => acc + purge.css, '');
      }

      this.emitFile({ type: 'asset', source, name: 'global.css' });
    },
  };
};

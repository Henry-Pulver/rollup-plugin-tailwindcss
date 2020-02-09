const { join } = require('path');
const { rollup } = require('rollup');
const postcss = require('rollup-plugin-postcss');
const test = require('tape');
const plugin = require('..');

const input = join(__dirname, 'fixtures/main.js');
const plugins = [postcss({ inject: false })];
const options = { input: join(__dirname, 'tailwind.css') };

test('default', async t => {
  t.plan(1);

  const bundle = await rollup({
    input,
    plugins: [...plugins, plugin(options)],
  });
  const { output } = await bundle.generate({});
  const [, css] = output;

  t.match(css.source, /hidden/, 'emits Tailwind stylesheet');
});

test('purge', async t => {
  t.plan(2);

  const bundle = await rollup({
    input,
    plugins: [...plugins, plugin({ ...options, purge: true })],
  });
  const { output } = await bundle.generate({});
  const [, css] = output;

  t.doesNotMatch(css.source, /hidden/, 'strips unused styles');
  t.match(css.source, /container/, 'includes used styles');
});

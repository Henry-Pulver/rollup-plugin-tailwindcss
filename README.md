# rollup-plugin-tailwindcss

Bundle Tailwind CSS stylesheet as a [Rollup](https://rollupjs.org/) asset.

## Install

```sh
npm i --save-dev rollup-plugin-tailwindcss # or yarn add -D rollup-plugin-tailwindcss
```

## Usage

```js
// rollup.config.js
import tailwind from 'rollup-plugin-tailwindcss';

export default {
  plugins: [
    tailwind({
      input: 'path/to/entry.css', // required
      // Tailor the emitted stylesheet to the bundle by removing any unused CSS
      // (highly recommended when packaging for distribution).
      purge: false,
    }),
  ],
};
```

## License

[MIT](https://github.com/alexdilley/rollup-plugin-tailwindcss/blob/master/LICENSE)

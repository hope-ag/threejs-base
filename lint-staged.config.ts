import path from 'node:path';

const tsc = () => 'tsc --noEmit';

const eslint = (filenames: string[]) =>
  `eslint --fix ${filenames.map((file) => path.relative(process.cwd(), file)).join(' ')}`;

const prettier = (filenames: string[]) =>
  `prettier --write ${filenames.map((file) => path.relative(process.cwd(), file)).join(' ')} --cache`;

export default {
  '*.ts': [tsc],
  '*.{js,ts}': [eslint],
  '*.{html,css,scss,js,cjs,mjs,ts}': [prettier]
};

const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#803e92',
          light: '#d2c3d6',
        },
        'user': '#6b7280',
        'ai':   '#474747'
      },
    },
  },
  plugins: [],
};

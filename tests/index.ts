// requires all tests in `project/test/src/components/**/index.js`

const tests = require.context('./src/', true, /\.spec.ts$/);

tests.keys().forEach(tests);

// requires all components in `project/src/components/**/index.js`
const components = require.context('../src/', true, /index\.ts$/);

components.keys().forEach(components);

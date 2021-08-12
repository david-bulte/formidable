const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/console',
    '<rootDir>/libs/shared/builder',
    '<rootDir>/libs/shared/layout',
    '<rootDir>/libs/console/builder',
    '<rootDir>/libs/shared/drag-n-drop',
  ],
};

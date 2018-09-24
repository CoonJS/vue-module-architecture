const modules = [
  require('./modules/auth/index'),
  require('./modules/reports/index'),
  require('./modules/marketplace/index'),
  require('./modules/profile/index'),
  require('./modules/organizations/index'),
  require('./modules/roles/index'),
  require('./modules/settings/index'),
  require('./modules/users/index'),
  require('./modules/wiki/index'),
  require('./modules/testing/index'),
  require('./modules/education/index')
];

export async function run (locator) {
  const startModules = modules.map(module => {
    return module.default(locator);
  });

  return await Promise.all(startModules);
}
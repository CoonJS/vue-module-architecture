const modules = [
  require('./modules/settings/index'),
  require('./modules/auth/index'),
  require('./modules/dashboards/index'),
  require('./modules/managers/index'),
  require('./modules/marketplace/index'),
  require('./modules/profile/index'),
  require('./modules/registration/index'),
  require('./modules/wiki/index')
];

export async function run (locator) {
  const startModules = modules.map(module => {
    return module.default(locator);
  });

  return await Promise.all(startModules);
}
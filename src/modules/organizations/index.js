import Organization from './src/service/Organization';

const OrganizationsPage = () => import(/* webpackChunkName: "organizations" */'./index.vue');
const OrgCardPage = () => import(/* webpackChunkName: "orgCard" */'./pages/OrgCard.vue');

export default async function(locator) {
  locator.registerService(Organization);

  const routerService = locator.Router;

  routerService.registerModuleRoutes([
    {
      path: '/organizations',
      name: 'Organizations',
      component: OrganizationsPage
    },
    {
      path: '/organizations/:orgId',
      name: 'OrganizationCard',
      component: OrgCardPage
    }
  ]);

}
import IntegrationSettings from './com/settings/Integration.vue';

export default async function(locator) {
  locator.Module.registerSettings('AMOCRM', IntegrationSettings);
}
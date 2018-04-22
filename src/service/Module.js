export default class Module {
  constructor() {
    this.name = 'Module';

    this.modules = [];

    this.settingsMap = {};
  }

  registerSettings(key, Component) {
    if (this.settingsMap[key] !== undefined) {
      throw `module settings with key ${key} exist`;
    }

    this.settingsMap[key] = Component;
  }

  getSettingsComponent(key) {
    return this.settingsMap[key];
  }
}
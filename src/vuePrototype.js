const baseFilePath = '/api/files';

export function initVuePrototype(Vue) {

  Vue.prototype.buildFileUrlById = id => {
    return `${baseFilePath}/${id}`;
  };

  Vue.prototype.getFileUrlPath = () => {
    return `${baseFilePath}`;
  };
}
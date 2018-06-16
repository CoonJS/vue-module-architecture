export default class ObjectUtils {
  constructor() {
    this.name = 'ObjectUtils';
  }

  deepFindByPath(obj, path) {
    let current = obj;
    const paths = path.split('.');

    for (let i = 0; i < paths.length; ++i) {
      if (current[paths[i]] === undefined) {
        return undefined;
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  }
}
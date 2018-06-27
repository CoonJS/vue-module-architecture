import _ from 'underscore';

export default class ArrayUtils {
  constructor() {
    this.name = 'ArrayUtils';
  }

  indexBy(array = [], cb) {
    return _.indexBy(array, cb);
  }

  groupBy(array = [], cb) {
    return _.groupBy(array, cb);
  }

  createTree(arr = []) {
    let tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(let i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (let id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentId !== null) {
          const parentIdEl = mappedArr[mappedElem['parentId']];

          if (parentIdEl !== undefined) {
            parentIdEl['children'].push(mappedElem);
          }
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }
}
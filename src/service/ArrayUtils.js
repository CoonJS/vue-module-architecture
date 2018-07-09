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

    for(let i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (let id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];

        if (mappedElem.parentId !== null) {
          const parentIdEl = mappedArr[mappedElem['parentId']];

          if (parentIdEl !== undefined) {
            parentIdEl['children'].push(mappedElem);
          }
        }

        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  treeSort(arr = [], cb) {
    arr.sort(cb);
    arr.forEach(node => {
      if (node.children.length !== 0) {
        this.treeSort(node.children, cb);
      }
    });

    return JSON.parse(JSON.stringify(arr));
  }
}
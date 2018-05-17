import _ from 'underscore';

export default class ArrayUtils {
  constructor() {
    this.name = 'ArrayUtils';
  }

  indexBy( array = [], cb) {
    return _.indexBy(array, cb);
  }

  groupBy( array = [], cb) {
    return _.groupBy(array, cb);
  }
}
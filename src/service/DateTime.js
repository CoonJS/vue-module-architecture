import dateformat from 'dateformat';

export default class DateTime {
  constructor() {
    this.name = 'DateTime';
  }

  format(date = Date.now(), format = 'dd.mm.yyyy H:M') {
    return dateformat(date, format);
  }
}
export default class NumberUtils {
  constructor() {
    this.name = 'NumberUtils';
  }

  format(number, digits = 2) {
    const si = [
      { value: 1, symbol: 'руб.' },
      { value: 1E3, symbol: 'тыс.' },
      { value: 1E6, symbol: 'млн.' },
      { value: 1E9, symbol: 'млрд.' },
      { value: 1E12, symbol: 'трлн.' }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (number >= si[i].value) {
        break;
      }
    }
    return (number / si[i].value).toFixed(digits).replace(rx, '$1') + ' ' + si[i].symbol;
  }
}
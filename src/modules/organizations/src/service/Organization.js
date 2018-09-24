export default class Organization {
  constructor() {
    this.name = 'Organization';
  }

  getTableColumns() {
    return [
      {
        key: 'id',
        name: 'ID',
        width: 50,
        align: 'center'
      }
    ];
  }
}
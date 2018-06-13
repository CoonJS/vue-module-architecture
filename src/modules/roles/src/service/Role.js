export default class Role {
  constructor() {
    this.name = 'Role';
  }

  getTableColumns() {
    return [
      {
        key: 'id',
        name: 'ID',
        width: 50,
        align: 'center'
      },
      {
        key: 'name',
        name: 'Название',
        width: 250,
        align: 'left'
      }
    ];
  }
}
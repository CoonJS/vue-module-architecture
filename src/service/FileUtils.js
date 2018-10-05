export default class FileUtils {

  constructor() {
    this.name = 'FileUtils';
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
  }
}
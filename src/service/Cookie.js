import Cookies from 'js-cookie';

export default class Cookie {
  setValue(name, value, options = {}) {
    return Cookies.set(name, value, options);
  }

  getValue(name) {
    return Cookies.get(name)
  }

  remove(name) {
    return Cookies.remove(name);
  }
}
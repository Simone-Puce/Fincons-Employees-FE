class Utils {
  capitalizeFirstLetter(str: string) {
    if (str !== undefined) {
      return str.replace(/^\w/, (c) => c.toUpperCase());
    } else {
      return "";
    }
  }
}

const utils = new Utils();

export default utils;

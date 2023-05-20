// import { ENV } from 'typings';
import AppData from './appData';

const ENV = 'DEV'; // DEV TEST PRO 打包注意修改
class Global {
  static API_HOST: string = AppData.API_DOMAIN[ENV];
  static BASE_PATH: string = AppData.BASE_PATH[ENV];
  static PRODUCT_ID: string = AppData.PRODUCT_ID[ENV];
  static ROUTE_MODE: any = AppData.ROUTE_MODE[ENV] as
    | 'browser'
    | 'hash'
    | 'memory';

  static getLoginToken() {
    const search = window.location.href.split('?')[1];
    return search?.split('token=')?.[1] || '';
  }

  //是否为空
  static CHECKNULL(item: any) {
    if (item === null || item === undefined || item === '') {
      return true;
    }
    return false;
  }

  static getFileNameByUrl(fileurl: string) {
    if (Global.CHECKNULL(fileurl) === true) {
      return '';
    }
    if (typeof fileurl !== 'string') return '';
    const pathArray: string[] = fileurl?.split('/');
    if (Global.CHECKNULL(pathArray) === true) {
      return '';
    }
    const countmax = pathArray.length;
    if (countmax <= 0) {
      return '';
    }
    const lastIndex = countmax - 1;
    if (lastIndex < 0) {
      return '';
    }
    const fileName = pathArray[lastIndex];
    return fileName;
  }
}

export default Global;

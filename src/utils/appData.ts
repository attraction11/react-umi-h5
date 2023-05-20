class AppData {
  static ACCESS: string = 'link'; // 外链 H5
  static APP_NAME: string = 'livxxx'; //上传接口相关，请勿随意改动
  static VERSION: string = 'test'; //上传接口相关，请勿随意改动
  static BASE_URI: string = `/${AppData.APP_NAME}/manage/${AppData.ACCESS}/${AppData.VERSION}/`; //部署非根目录


  static API_DOMAIN = {
    DEV: '/api',
    TEST: 'https://api-qa.xxxxx.com',
    PRO: 'https://api.xxxxx.com',
  };

  static BASE_PATH = {
    DEV: '/',
    TEST: AppData.BASE_URI,
    PRO: '/',
  };

  // 19 - aws ;   9  - ali
  static PRODUCT_ID = {
    DEV: '9',
    TEST: '9',
    PRO: '19',
  };

  // 8 - aws ;   9  - ali
  static ROUTE_MODE = {
    DEV: 'hash',
    TEST: 'hash',
    PRO: 'hash',
  };
}
export default AppData;

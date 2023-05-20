import { message } from 'antd';
import axios from 'axios';
import type { AxiosRequestHeaders } from 'axios/index';
import Global from './global';

const instance = axios.create({ baseURL: `${Global.API_HOST}` });

instance.interceptors.request.use(
  (config: { headers: any; data?: any; url?: string }) => {
    config.headers = {
      ...config.headers,
    } as AxiosRequestHeaders;

    return config;
  },
  (error: any) => Promise.reject(error),
);

instance.interceptors.response.use(
  //状态码为2xx的时候执行
  (response: { data: any }) => {
    const { data } = response;
    const { code } = data;
    console.log('global data: ', data);

    if (code !== 200) {
      message.error(data.message);
      return Promise.reject(data);
    }
    return data;
  },
  //状态码不为2xx的时候执行
  (error: { response: any }) => {
    const { response } = error;
    if (!response) Promise.reject(error);
    const { status } = response;

    const codeMessage: any = {
      400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
      401: '用户未登录。',
      403: '用户得到授权，但是访问是被禁止的。',
      404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
      406: '请求的格式不可得。',
      410: '请求的资源被永久删除，且不会再得到的。',
      422: '当创建一个对象时，发生一个验证错误。',
      500: '服务器发生错误，请检查服务器。',
      502: '网关错误。',
      503: '服务不可用，服务器暂时过载或维护。',
      504: '网关超时。',
    };

    message.error(response.data.message || codeMessage[status]);

    if (status === 401) {
      console.log('401');
    }

    return Promise.reject(error);
  },
);

export default instance;

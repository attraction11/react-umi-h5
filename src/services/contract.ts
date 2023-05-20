import Global from '@/utils/global';
import request from '@/utils/request';
import { API } from 'typings';

// 获取商户基本信息（H5）
export const queryMerchantBaseInfo = (): Promise<
  API.ResponstBody<API.MerchantBaseInfo>
> =>
  request.post(
    'queryMerchantBaseInfo',
    {
      business: {
        token: Global.getLoginToken() || '',
      },
    },
    {
      headers: {
        method: 'queryMerchantBaseInfo',
        module: 'bbbbbb',
        rpcType: 'aaaaaa',
        appVersion: 1,
        appId: 'xxxxxx',
        timestamp: new Date().valueOf(),
      },
    },
  );

// 商户reseller申请(H5)
export const fetchResellerApply = (
  data: Record<string, unknown>,
): Promise<API.ResponstBody<any>> =>
  request.post(
    'resellerApply',
    {
      business: {
        ...data,
        token: Global.getLoginToken() || '',
      },
    },
    {
      headers: {
        method: 'resellerApply',
        module: 'bbbbbb',
        rpcType: 'aaaaaa',
        appVersion: 1,
        appId: `xxxxxx`,
        timestamp: new Date().valueOf(),
      },
    },
  );

import { getNow } from '@/utils';
import Global from '@/utils/global';
import request from '@/utils/request';
import { API } from 'typings';

// 获取临时上传密钥
export const fetchMockUpload = (
  data?: any,
): Promise<API.ResponstBody<API.OssUploadParams>> =>
  request.post(
    '',
    {
      business: {
        appKey: '10000000',
        fileName: `contract/${data.fileName}`,
        privatelyStore: 'false',
        productId: Global.PRODUCT_ID, // 19 - aws ;   9  - ali
      },
    },
    {
      headers: {
        method: 'upload',
        module: 'yyyyyy-ms',
        appVersion: 1,
        rpcType: 'aaaaa',
        appId: 'xxxxx',
        timestamp: `${getNow()}`,
      },
    },
  );

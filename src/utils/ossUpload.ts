import { fetchMockUpload } from '@/services';
import { message } from 'antd';
import { getNow } from '.';

// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const OSS = require('ali-oss');
const AWS = require('aws-sdk');

// 获取当前时间戳
const getTimestampName = () => {
  return `${getNow()}.png`;
};

export const uploadFileToOss = async (file: any) => {
  const { data } = await fetchMockUpload({
    fileName: getTimestampName(),
  });

  if (data.ossType === 'ali') {
    const client = new OSS({
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
      // region: data.region,
      // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
      accessKeyId: data.accessKey,
      accessKeySecret: data.accessSecret,
      cname: true,
      endpoint: data.domain,
      // 从STS服务获取的安全令牌（SecurityToken）。
      stsToken: data.securityToken,
      bucket: data.bucket,
    });

    try {
      console.log('put start');
      // object表示上传到OSS的文件名称。
      // file表示浏览器中需要上传的文件，支持HTML5 file和Blob类型。
      const { res } = await client.put(data.filePath, file);
      message.success('upload success');
      return res.requestUrls[0];
    } catch (e) {
      console.error('upload error: ', e);
    }
    return;
  }

  if (data.ossType === 'aws') {
    const s3 = new AWS.S3({
      accessKeyId: data.accessKey,
      secretAccessKey: data.accessSecret,
      sessionToken: data.securityToken,
      region: data.region,
    });
    const params = {
      Bucket: data.bucket,
      Key: data.filePath,
      Body: file, // your_file是文件对象
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err: any, data: { Location: any }) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(`File uploaded successfully. ${data.Location}`);
          resolve(data.Location);
        }
      });
    });
  }
};

import FileUploadOSS from '@/components/FileUploadOSS';
import Signature from '@/components/Signature';
import { fetchResellerApply, queryMerchantBaseInfo } from '@/services/contract';
import getImage, { dataURLtoFile, getFileNameByUrl } from '@/utils';
import { uploadFileToOss } from '@/utils/ossUpload';
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Select,
  Spin,
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useRef, useState } from 'react';
import { Icon } from 'umi';
import { StateOption } from './constant';
import styles from './index.less';

// eslint-disable-next-line @typescript-eslint/ban-types
type IProps = React.PropsWithChildren<{}>;
let canvas: any;

const Index: React.FC<IProps> = () => {
  const [name, setName] = useState<string>();
  const [contractTpl, setContractTpl] = useState<string>();
  const [typeNum, setTypeNum] = useState<number>(1);
  const [applyInfo, setApplyInfo] = useState<any>();
  const [voidToken, setVoidToken] = useState(true);
  const [checked, setChecked] = useState(false);
  const [loading, setloading] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const SignRef = useRef<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onRadioChange = (e: RadioChangeEvent) => {
    setTypeNum(e.target.value);
  };

  // 1、填写表单
  const formatApplyInfo = (values: any) => {
    if (values.type > 1) {
      values['businessPanFileName'] = getFileNameByUrl(
        values.businessPanFileUrl,
      );
    }
    if (values.type > 2) {
      values['certificateFileName'] = getFileNameByUrl(
        values.certificateFileUrl,
      );
    }
    return {
      ...values,
      aadhaarFileName: getFileNameByUrl(values.aadhaarFileUrl),
      panFileName: getFileNameByUrl(values.panFileUrl),
    };
  };

  const onFinishForm = (values: any) => {
    setApplyInfo(formatApplyInfo(values));
    setShowContract(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 2、阅读并勾选合同
  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  const closeContractModal = () => {
    setShowContract(false);
  };

  const onFinishContract = () => {
    setShowContract(false);
    setShowSign(true);
  };

  // 3、手写电子签名
  const closeSignModal = () => {
    SignRef.current.clearSign();
    setShowSign(false);
  };

  const compositeImg = async (data: string) => {
    canvas = document.createElement('canvas');
    const bgImg = await getImage(contractTpl!);
    const width = bgImg?.width || 0;
    const height = bgImg?.height || 0;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx?.drawImage(bgImg, 0, 0, width, height);
    const signImg = await getImage(data);
    ctx?.drawImage(signImg, 210, height - 780, 400, 200);
  };

  const handleSign = async (url: string) => {
    messageApi.open({
      type: 'loading',
      content: 'the contract is being signed please wait...',
      duration: 0,
    });
    await compositeImg(url);
    const dataURL = canvas.toDataURL('image/jpeg', 1);

    // 上传合同+签名
    const imgfile = dataURLtoFile(dataURL);
    const contractUrl = await uploadFileToOss(imgfile);
    setloading(true);
    fetchResellerApply({
      ...applyInfo,
      contractFileName: getFileNameByUrl(contractUrl),
      contractFileUrl: contractUrl,
    })
      .then(() => {
        closeSignModal();
        setShowResult(true);
      })
      .finally(() => {
        messageApi.destroy();
        setloading(false);
      });
  };

  // 4、提示成功签约
  const onGotResult = () => {
    setShowResult(false);
    window.location.reload();
  };

  // 初始化合同 canvas
  useEffect(() => {
    queryMerchantBaseInfo().then((data) => {
      if (!data.success) {
        setVoidToken(true);
        return;
      }
      setVoidToken(false);
      const { name, resellerContract } = data.data;
      setName(name);
      setContractTpl(resellerContract?.fileUrl);
    });
  }, []);

  return (
    <Spin spinning={loading}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.title}>Reseller Invitation</div>
        <div className={styles.subTitle}>Invite you to be the reseller</div>
        <div className={styles.reseller}>
          <div className={styles.txt1}>{name}</div>
          <div className={styles.txt2}>
            <Icon icon="local:certify" width="16" height="16" /> Baat official
          </div>
        </div>
        <div className={styles.business}>
          <div className={styles.title}>Business details</div>
          <Form
            name="basic"
            layout={'vertical'}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ type: 1 }}
            onFinish={onFinishForm}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="type"
              label="Business Type"
              rules={[
                { required: true, message: 'Please Select Business Type' },
              ]}
            >
              <Radio.Group onChange={onRadioChange}>
                <Radio value={1}>Individual</Radio>
                <Radio value={2}>Proprietor</Radio>
                <Radio value={3}>LLP</Radio>
                <Radio value={4}>Private</Radio>
                <Radio value={5}>Partnership</Radio>
              </Radio.Group>
            </Form.Item>
            {typeNum > 1 && (
              <>
                <Form.Item
                  label="Business Name"
                  name="businessName"
                  rules={[
                    { required: true, message: 'Please Input Business Name' },
                  ]}
                >
                  <Input
                    allowClear
                    size="large"
                    placeholder="Please Input Business Name"
                  />
                </Form.Item>
                <Form.Item
                  label="Business PAN"
                  name="businessPan"
                  rules={[
                    { required: true, message: 'Please Input Business PAN' },
                  ]}
                >
                  <Input
                    allowClear
                    size="large"
                    placeholder="Please Input Business PAN"
                  />
                </Form.Item>
                <Form.Item
                  label="GST Number"
                  name="gstNumber"
                  rules={[
                    { required: true, message: 'Please Input GST Number' },
                  ]}
                >
                  <Input
                    allowClear
                    size="large"
                    placeholder="Please Input GST Number"
                  />
                </Form.Item>
                {typeNum > 2 && (
                  <Form.Item
                    name="certificateFileUrl"
                    label="Incorporation Certificate"
                    rules={[{ required: true }]}
                  >
                    <FileUploadOSS />
                  </Form.Item>
                )}
                <Form.Item
                  name="businessPanFileUrl"
                  label="Business PAN"
                  rules={[{ required: true }]}
                >
                  <FileUploadOSS />
                </Form.Item>
              </>
            )}

            <div className={styles.subTitle}>Individual KYC of Re-Seller</div>
            <Form.Item
              label="Individual Name"
              name="individualName"
              rules={[
                { required: true, message: 'Please Input Individual Name' },
              ]}
            >
              <Input
                allowClear
                size="large"
                placeholder="Please Input Individual Name"
              />
            </Form.Item>
            <Form.Item
              label="PAN"
              name="panNumber"
              rules={[{ required: true, message: 'Please Input PAN' }]}
            >
              <Input allowClear size="large" placeholder="Please Input PAN" />
            </Form.Item>
            <Form.Item
              name="aadhaarFileUrl"
              label="Aadhaar File"
              rules={[{ required: true }]}
            >
              <FileUploadOSS />
            </Form.Item>
            <Form.Item
              name="panFileUrl"
              label="Business PAN"
              rules={[{ required: true }]}
            >
              <FileUploadOSS />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[
                { required: true, message: 'Please Input Mobile Number' },
              ]}
            >
              <Input
                allowClear
                size="large"
                placeholder="Please Input Mobile Number"
              />
            </Form.Item>
            <Form.Item
              label="Email ID"
              name="email"
              rules={[{ required: true, message: 'Please Input Email ID' }]}
            >
              <Input
                allowClear
                size="large"
                placeholder="Please Input Email ID"
              />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: 'Please select State' }]}
            >
              <Select
                size="large"
                placeholder="Search state"
                options={StateOption}
              ></Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                size={'large'}
                type="primary"
                htmlType="submit"
                block
                disabled={voidToken}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div
          className={`${styles.contract} ${showContract ? styles.show : ''}`}
        >
          <div className={styles.inner}>
            <div className={styles.txt}>Sign contract</div>
            <div className={styles.close} onClick={closeContractModal}>
              <Icon icon="local:close" width="24" height="24" />
            </div>
            <div className={styles.context}>
              <img src={contractTpl}></img>
            </div>
            <div className={styles.checkbox}>
              <Checkbox checked={checked} onChange={onChange}>
                I have read the contract and agree to all terms
              </Checkbox>
            </div>
            <div className={styles.signBtn}>
              <Button
                size={'large'}
                type="primary"
                htmlType="submit"
                disabled={!checked}
                block
                onClick={onFinishContract}
              >
                Sign
              </Button>
            </div>
          </div>
        </div>
        <div className={`${styles.sign} ${showSign ? styles.show : ''}`}>
          <Signature
            onFinishSign={handleSign}
            onClose={closeSignModal}
            disable={loading}
            ref={SignRef}
          ></Signature>
        </div>
        <div className={`${styles.result} ${showResult ? styles.show : ''}`}>
          <div className={styles.inner}>
            <Icon icon="local:success" width="64" height="64" />
            <div className={styles.txt1}>Application successful</div>
            <div className={styles.txt2}>Waiting for the official review</div>
            <Button size={'large'} type="primary" block onClick={onGotResult}>
              Got it
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Index;

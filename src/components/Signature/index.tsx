import SmoothSignature from '@/utils/signature';
import { Button, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styles from './index.less';

interface Props {
  onClose: () => void;
  onFinishSign: (value: string) => void;
  disable: boolean;
}

let signaturePad: any;

export default forwardRef((props: Props, ref) => {
  const [noSign, setNoSign] = useState(true);
  const { onFinishSign, disable, onClose } = props;

  // 初始化签名
  useEffect(() => {
    const signNode = document.getElementById('canvas1');
    const options = {
      width: window.innerWidth - 100,
      height: window.innerHeight - 50,
      minWidth: 4,
      maxWidth: 6,
      scale: 3,
    };
    signaturePad = new SmoothSignature(signNode as HTMLCanvasElement, options);
    signaturePad.onStart = () => {
      setNoSign(false);
    };

    return () => {
      signaturePad.removeListener();
    };
  }, []);

  const clearSign = () => {
    signaturePad.clear();
    setNoSign(true);
  };

  const onSubmit = () => {
    const newImg = signaturePad.getRotateCanvas(-90);
    const data = newImg.toDataURL();
    if (!data) {
      message.error('Production Of Signature Images Failed, Please Try Again');
      return;
    }
    onFinishSign(data);
  };

  //用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(
    ref,
    () => {
      // 需要将暴露的接口返回出去
      return {
        clearSign: clearSign,
      };
    },
    [],
  );

  return (
    <div className={styles.mbDemo}>
      <div className={styles.wrap2}>
        <div className={styles.actionsWrap}>
          <div className={styles.actions}>
            <Button size={'large'} className={styles.item} onClick={onClose}>
              Cancel
            </Button>
            <Button size={'large'} className={styles.item} onClick={clearSign}>
              Reset
            </Button>
            <Button
              size={'large'}
              className={styles.item}
              type="primary"
              onClick={onSubmit}
              disabled={noSign || disable}
            >
              Submit
            </Button>
          </div>
        </div>
        <canvas className={styles.canvas} id="canvas1" />
      </div>
    </div>
  );
});

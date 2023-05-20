import { uploadFileToOss } from '@/utils/ossUpload';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useState } from 'react';

interface PriceInputProps {
  onChange?: (value: UploadFile | null) => void;
}

export default (props: PriceInputProps) => {
  const { onChange } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = (file: UploadFile) => {
    setUploading(true);
    uploadFileToOss(file)
      .then((link) => {
        onChange?.(link || null);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const innerProps: UploadProps = {
    onRemove: () => {
      setFileList([]);
      onChange?.(null);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      handleUpload(file);
      return false;
    },
    fileList,
  };

  return (
    <Upload {...innerProps}>
      <Button loading={uploading} icon={<UploadOutlined />}>
        {uploading ? 'Uploading' : 'Click to Upload'}
      </Button>
    </Upload>
  );
};

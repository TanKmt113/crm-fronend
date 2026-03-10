import { Upload, Button, Typography, Space, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

const { Text } = Typography;

interface ImageUploadSectionProps {
  title: string;
  currentImage: string;
  currentImageAlt: string;
  fileList: UploadFile[];
  onFileListChange: (fileList: UploadFile[]) => void;
  recommendedSize: string;
  maxSizeMB?: number;
  imageHeight?: number;
  imageWidth?: number | string;
}

export default function ImageUploadSection({
  title,
  currentImage,
  currentImageAlt,
  fileList,
  onFileListChange,
  recommendedSize,
  maxSizeMB = 5,
  imageHeight,
  imageWidth = '100%',
}: ImageUploadSectionProps) {
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ được upload file ảnh!');
        return false;
      }
      const isLtMaxSize = file.size / 1024 / 1024 < maxSizeMB;
      if (!isLtMaxSize) {
        message.error(`Ảnh phải nhỏ hơn ${maxSizeMB}MB!`);
        return false;
      }
      return false; // Prevent auto upload
    },
    maxCount: 1,
    fileList,
    onChange: ({ fileList }) => onFileListChange(fileList),
    listType: 'picture',
  };

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Text strong>{title} hiện tại:</Text>
        <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-4">
          <Image
            src={currentImage}
            alt={currentImageAlt}
            width={imageWidth}
            height={imageHeight}
            preview={false}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div>
        <Text strong>Upload {title.toLowerCase()} mới:</Text>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} className="mt-2">
            Chọn ảnh
          </Button>
        </Upload>
        <Text type="secondary" className="mt-2 block text-sm">
          Khuyến nghị: {recommendedSize}, tối đa {maxSizeMB}MB
        </Text>
      </div>
    </Space>
  );
}

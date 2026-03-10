'use client';

import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Space,
  message,
  Divider,
} from 'antd';
import { DragOutlined, SaveOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import type { HomepageSection, WebsiteSettings } from '@/types';
import ImageUploadSection from '@/components/admin/image-upload-section';
import SortableSections from '@/components/admin/sortable-sections';
import { MOCK_WEBSITE_SETTINGS } from '@/lib/mock-data';

const { Title, Text } = Typography;

export default function SettingsPage() {
  const [logoFile, setLogoFile] = useState<UploadFile[]>([]);
  const [bannerFile, setBannerFile] = useState<UploadFile[]>([]);
  const [sections, setSections] = useState<HomepageSection[]>(
    MOCK_WEBSITE_SETTINGS.homepageSections
  );
  const [saving, setSaving] = useState(false);

  // Current settings
  const currentSettings: WebsiteSettings = {
    logo: MOCK_WEBSITE_SETTINGS.logo,
    banner: MOCK_WEBSITE_SETTINGS.banner,
    homepageSections: MOCK_WEBSITE_SETTINGS.homepageSections,
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: Implement API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const payload = {
        logo: logoFile.length > 0 ? logoFile[0] : null,
        banner: bannerFile.length > 0 ? bannerFile[0] : null,
        sections: sections,
      };

      console.log('Saving settings:', payload);
      message.success('Lưu cài đặt thành công!');
    } catch (error) {
      message.error('Lỗi khi lưu cài đặt!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Title level={2} style={{ margin: 0 }}>
          Cài đặt Website
        </Title>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          size="large"
          loading={saving}
          onClick={handleSave}
        >
          Lưu thay đổi
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {/* Logo Settings */}
        <Col xs={24} lg={12}>
          <Card title="Logo Website" className="shadow-sm">
            <ImageUploadSection
              title="Logo"
              currentImage={currentSettings.logo}
              currentImageAlt="Current Logo"
              fileList={logoFile}
              onFileListChange={setLogoFile}
              recommendedSize="PNG hoặc SVG, kích thước 200x60px"
              imageHeight={60}
            />
          </Card>
        </Col>

        {/* Banner Settings */}
        <Col xs={24} lg={12}>
          <Card title="Banner Trang chủ" className="shadow-sm">
            <ImageUploadSection
              title="Banner"
              currentImage={currentSettings.banner}
              currentImageAlt="Current Banner"
              fileList={bannerFile}
              onFileListChange={setBannerFile}
              recommendedSize="JPG hoặc PNG, kích thước 1200x400px"
              imageHeight={120}
            />
          </Card>
        </Col>

        {/* Homepage Sections Order */}
        <Col xs={24}>
          <Card
            title="Sắp xếp Sections Trang chủ"
            className="shadow-sm"
            extra={
              <Text type="secondary">
                <DragOutlined /> Kéo thả để sắp xếp
              </Text>
            }
          >
            <SortableSections
              sections={sections}
              onSectionsChange={setSections}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <div className="flex justify-end">
        <Space>
          <Text type="secondary">
            Nhớ nhấn <strong>Lưu thay đổi</strong> để áp dụng cài đặt mới
          </Text>
        </Space>
      </div>
    </div>
  );
}

'use client';

import { Form, Input, Switch, Button, Card, Typography, Space, message, Divider, Tag } from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  SendOutlined,
  EyeOutlined,
  PictureOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { postsControllerCreateV1 } from '@/lib/api/generated/clients';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function CreatePostPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const router = useRouter();

  const handleSave = async (publish: boolean) => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await postsControllerCreateV1({ ...values, isPublished: publish });
      message.success(publish ? 'Đã xuất bản bài viết!' : 'Đã lưu nháp!');
      router.push('/admin/posts');
    } catch (error: any) {
      if (error?.errorFields) return; // form validation error
      const errorMessage = error?.response?.data?.message || 'Lưu bài viết thất bại!';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-200 py-2">
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/admin/posts')}>
            Quay lại
          </Button>
          <Title level={5} style={{ margin: 0 }}>
            Thêm bài viết mới
          </Title>
        </Space>
        <Space>
          <Button icon={<EyeOutlined />}>Xem trước</Button>
          <Button icon={<SaveOutlined />} onClick={() => handleSave(false)} loading={loading}>
            Lưu nháp
          </Button>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => handleSave(true)}
            loading={loading}
          >
            Xuất bản
          </Button>
        </Space>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl p-6">
        <Form
          form={form}
          layout="vertical"
          initialValues={{ isPublished: false }}
        >
          <div className="flex gap-6">
            {/* Left - Main editor */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* Title */}
              <Card className="" styles={{ body: { padding: '10px 14px' } }}>
                <Form.Item
                  name="title"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'Vui lòng nhập tiêu đề!' },
                    { min: 3, message: 'Tiêu đề phải có ít nhất 3 ký tự!' },
                  ]}
                >
                  <Input
                    placeholder="Nhập tiêu đề bài viết tại đây..."
                    variant="borderless"
                    size="large"
                  />
                </Form.Item>
              </Card>

              {/* Content */}
              <Card
                title={
                  <Space>
                    <SettingOutlined />
                    <span>Nội dung</span>
                  </Space>
                }
                className="shadow-sm"
              >
                <Form.Item
                  name="content"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'Vui lòng nhập nội dung!' },
                    { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự!' },
                  ]}
                >
                  <TextArea
                    placeholder="Bắt đầu viết nội dung bài viết tại đây... (hỗ trợ Markdown)"
                    autoSize={{ minRows: 20 }}
                    showCount
                    style={{ fontFamily: 'monospace', fontSize: 14 }}
                  />
                </Form.Item>
              </Card>

              {/* Excerpt */}
              <Card title="Mô tả ngắn (Excerpt)" className="shadow-sm">
                <Text type="secondary" className="mb-3 block text-sm">
                  Mô tả ngắn sẽ hiển thị trong danh sách bài viết và kết quả tìm kiếm.
                </Text>
                <Form.Item
                  name="description"
                  style={{ marginBottom: 0 }}
                  rules={[{ max: 500, message: 'Mô tả không được vượt quá 500 ký tự!' }]}
                >
                  <TextArea
                    placeholder="Nhập mô tả ngắn cho bài viết..."
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                </Form.Item>
              </Card>
            </div>

            {/* Right sidebar */}
            <div className="w-72 shrink-0 flex flex-col gap-4">
              {/* Publish box */}
              <Card title="Xuất bản" className="shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Text className="text-sm">Trạng thái:</Text>
                    <Tag color={isPublished ? 'green' : 'gold'}>
                      {isPublished ? 'Xuất bản' : 'Nháp'}
                    </Tag>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="text-sm">Khả năng hiển thị:</Text>
                    <Tag color="blue">Công khai</Tag>
                  </div>
                  <Divider style={{ margin: '12px 0' }} />
                  <Form.Item name="isPublished" valuePropName="checked" style={{ marginBottom: 0 }}>
                    <div className="flex items-center justify-between">
                      <Text className="text-sm font-medium">Xuất bản ngay:</Text>
                      <Switch
                        checkedChildren="Bật"
                        unCheckedChildren="Tắt"
                        onChange={(checked) => setIsPublished(checked)}
                      />
                    </div>
                  </Form.Item>
                  <Divider style={{ margin: '12px 0' }} />
                  <div className="space-y-2">
                    <Button
                      block
                      icon={<SaveOutlined />}
                      onClick={() => handleSave(false)}
                      loading={loading}
                    >
                      Lưu nháp
                    </Button>
                    <Button
                      block
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={() => handleSave(true)}
                      loading={loading}
                    >
                      Xuất bản
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Featured Image */}
              <Card title="Ảnh đại diện" className="shadow-sm">
                <Form.Item
                  name="featuredImage"
                  style={{ marginBottom: 0 }}
                  rules={[{ type: 'url', message: 'Vui lòng nhập URL hợp lệ!' }]}
                >
                  <Input placeholder="https://example.com/image.jpg" prefix={<PictureOutlined />} />
                </Form.Item>
                <Text type="secondary" className="mt-2 block text-xs">
                  Nhập URL ảnh đại diện cho bài viết
                </Text>
              </Card>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

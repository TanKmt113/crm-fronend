'use client';

import { Form, Input, Switch, Button, Card, Typography, Space, Divider, Tag, Spin } from 'antd';
import { toast } from 'sonner';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  SendOutlined,
  EyeOutlined,
  PictureOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { postsControllerUpdateV1, postsControllerFindOneV1 } from '@/lib/api/generated/clients';
import type { Post } from '@/lib/api/generated/types';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/admin/rich-text-editor'), { ssr: false });

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function EditPostPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const fetchPost = async () => {
      setFetching(true);
      try {
        const p = await postsControllerFindOneV1({ id });
        setPost(p);
        setIsPublished(p.isPublished);
        form.setFieldsValue({
          title: p.title,
          description: p.description,
          content: p.content,
          featuredImage: p.featuredImage,
          isPublished: p.isPublished,
        });
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Không tìm thấy bài viết!');
        router.push('/admin/posts');
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchPost();
  }, [id, form, router]);

  const handleSave = async (publish: boolean) => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await postsControllerUpdateV1({ id }, { ...values, isPublished: publish });
      toast.success(publish ? 'Đã xuất bản bài viết!' : 'Đã lưu nháp!');
      router.push('/admin/posts');
    } catch (error: any) {
      if (error?.errorFields) return; // form validation
      const errorMessage = error?.response?.data?.message || 'Lưu bài viết thất bại!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white py-2">
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/admin/posts')}>
            Quay lại
          </Button>
          <Title level={5} style={{ margin: 0 }}>
            Chỉnh sửa: {post?.title}
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
        <Spin spinning={fetching} description="Đang tải bài viết..." size="large">
        <Form form={form} layout="vertical">
          <div className="flex gap-6">
            {/* Left - Main editor */}
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              {/* Title */}
              <Card styles={{ body: { padding: '10px 14px' } }}>
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
                  <RichTextEditor
                    placeholder="Bắt đầu viết nội dung bài viết tại đây..."
                    minHeight={480}
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
            <div className="flex w-72 shrink-0 flex-col gap-4">
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
                      <Text className="text-sm font-medium">Trạng thái xuất bản:</Text>
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
                  <Input
                    placeholder="https://example.com/image.jpg"
                    prefix={<PictureOutlined />}
                  />
                </Form.Item>
                <Text type="secondary" className="mt-2 block text-xs">
                  Nhập URL ảnh đại diện cho bài viết
                </Text>
              </Card>
            </div>
          </div>
        </Form>
        </Spin>
      </div>
    </div>
  );
}

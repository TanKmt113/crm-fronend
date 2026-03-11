'use client';

import { Form, Input, Switch, Button, Card, Typography, Space, Divider, Tag, Spin, Drawer, Avatar, Badge } from 'antd';
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{ title: string; description: string; content: string; featuredImage: string }>({
    title: '',
    description: '',
    content: '',
    featuredImage: '',
  });
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

  const handlePreview = () => {
    const values = form.getFieldsValue();
    setPreviewData({
      title: values.title || '(Chưa có tiêu đề)',
      description: values.description || '',
      content: values.content || '',
      featuredImage: values.featuredImage || '',
    });
    setPreviewOpen(true);
  };

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
    <>
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
          <Button icon={<EyeOutlined />} onClick={handlePreview}>Xem trước</Button>
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

      {/* Preview Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <EyeOutlined className="text-pink-600" />
            <span>Xem trước bài viết</span>
            <Badge
              count={previewData.title ? 'Live' : ''}
              color="#16a34a"
              style={{ fontSize: 10 }}
            />
          </div>
        }
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        size="large"
        styles={{ body: { padding: 0, background: '#f8fafc' } }}
        extra={
          <Space>
            <Button size="small" onClick={() => setPreviewOpen(false)}>
              Đóng
            </Button>
          </Space>
        }
      >
        <div className="min-h-full bg-slate-50">
          {/* Browser chrome mock */}
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 shadow-sm">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="ml-2 flex-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
              yoursite.com/blog/{post?.slug || 'slug-bai-viet'}
            </div>
          </div>

          {/* Article layout */}
          <article className="mx-auto max-w-2xl px-6 py-10">
            {/* Category / breadcrumb placeholder */}
            <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
              <span>Blog</span>
              <span>›</span>
              <span className="text-pink-600">Tin tức</span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900">
              {previewData.title || <span className="italic text-slate-400">Chưa có tiêu đề</span>}
            </h1>

            {/* Meta */}
            <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2">
                <Avatar size={32} style={{ background: '#db2777', fontSize: 13 }}>
                  {post?.author?.firstName?.[0] ?? 'A'}
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {post?.author?.firstName ?? 'Tác giả'} {post?.author?.lastName ?? ''}
                  </p>
                  <p className="text-xs text-slate-500">
                    {post?.publishedAt
                      ? new Date(post.publishedAt as string).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })
                      : new Date().toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                  </p>
                </div>
              </div>
              <Tag color={isPublished ? 'green' : 'gold'} className="ml-auto">
                {isPublished ? 'Xuất bản' : 'Bản nháp'}
              </Tag>
            </div>

            {/* Featured Image */}
            {previewData.featuredImage && (
              <div className="mb-8 overflow-hidden rounded-xl shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewData.featuredImage}
                  alt={previewData.title}
                  className="h-64 w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Description */}
            {previewData.description && (
              <p className="mb-8 border-l-4 border-pink-400 bg-pink-50 px-4 py-3 text-base italic text-slate-600">
                {previewData.description}
              </p>
            )}

            {/* Content */}
            <div
              className="tiptap prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: previewData.content }}
            />

            {/* Footer */}
            <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
              — Hết bài viết —
            </div>
          </article>
        </div>
      </Drawer>
    </>
  );
}

'use client';

import { Modal, Form, Input, Switch, message } from 'antd';
import { useState } from 'react';
import { postsControllerCreateV1 } from '@/lib/api/generated/clients';
import type { CreatePostDto } from '@/lib/api/generated/types';

const { TextArea } = Input;

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreatePostModal({ open, onClose, onSuccess }: CreatePostModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreatePostDto) => {
    setLoading(true);
    try {
      await postsControllerCreateV1(values);
      message.success('Tạo bài viết thành công!');
      form.resetFields();
      onClose();
      onSuccess?.();
    } catch (error: any) {
      console.error('Create post error:', error);
      const errorMessage = error?.response?.data?.message || 'Tạo bài viết thất bại!';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Thêm bài viết mới"
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={800}
      okText="Tạo bài viết"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          isPublished: false,
        }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề!' },
            { min: 3, message: 'Tiêu đề phải có ít nhất 3 ký tự!' },
          ]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" size="large" />
        </Form.Item>

        <Form.Item
          label="Mô tả ngắn"
          name="description"
          rules={[
            { max: 500, message: 'Mô tả không được vượt quá 500 ký tự!' },
          ]}
        >
          <TextArea
            placeholder="Nhập mô tả ngắn cho bài viết"
            rows={3}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[
            { required: true, message: 'Vui lòng nhập nội dung!' },
            { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự!' },
          ]}
        >
          <TextArea
            placeholder="Nhập nội dung bài viết"
            rows={10}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện (URL)"
          name="featuredImage"
          rules={[
            { type: 'url', message: 'Vui lòng nhập URL hợp lệ!' },
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item
          label="Xuất bản ngay"
          name="isPublished"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}

'use client';

import { Table, Button, Space, Tag, Input, Card, Typography, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  postsControllerFindAllV1,
  postsControllerRemoveV1,
} from '@/lib/api/generated/clients';
import type { Post } from '@/lib/api/generated/types';

const { Title } = Typography;

export default function AdminPostsPage() {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    setTableLoading(true);
    try {
      const res = await postsControllerFindAllV1({ page: 1, limit: 100 });
      setPosts(res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Tải danh sách bài viết thất bại!');
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const filteredPosts = useMemo(() => {
    const q = searchText.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(q));
  }, [searchText, posts]);

  const handleDelete = async (id: number) => {
    try {
      await postsControllerRemoveV1({ id: String(id) });
      toast.success('Đã xoá bài viết!');
      fetchPosts();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Xoá bài viết thất bại!');
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
    },
    {
      title: 'Tác giả',
      key: 'author',
      render: (_: any, record: Post) => record.author?.firstName ?? '—',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: Post) => (
        <Tag color={record.isPublished ? 'green' : 'gold'}>
          {record.isPublished ? 'Đã xuất bản' : 'Nháp'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (v: string) => new Date(v).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Post) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-600"
            onClick={() => router.push(`/admin/posts/${record.id}/edit`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xoá bài viết"
            description="Bạn có chắc muốn xoá bài viết này không?"
            okText="Xoá"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="text" icon={<DeleteOutlined />} danger>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Title level={3} style={{ margin: 0 }}>Quản lý bài viết</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push('/admin/posts/create')}
        >
          Thêm bài viết mới
        </Button>
      </div>

      <Card>
        <Input
          placeholder="Tìm kiếm bài viết..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 400 }}
          allowClear
        />
      </Card>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredPosts.map((p) => ({ ...p, key: p.id }))}
          loading={tableLoading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

    </div>
  );
}

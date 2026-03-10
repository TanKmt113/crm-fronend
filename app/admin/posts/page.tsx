'use client';

import { Table, Button, Space, Tag, Input, Card, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { MOCK_POSTS } from '@/lib/mock-data';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function AdminPostsPage() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
    },
    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'PUBLISHED' ? 'green' : 'gold'}>
          {status === 'PUBLISHED' ? 'Đã xuất bản' : 'Nháp'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} className="text-blue-600" />
          <Button type="text" icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <div className='flex flex-col gap-6'>
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
        />
      </Card>
      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={MOCK_POSTS.map(p => ({ ...p, key: p.id }))}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}

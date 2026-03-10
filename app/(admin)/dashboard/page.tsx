'use client';

import { Row, Col, Card, Statistic, Table, Tag, Typography } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { MOCK_POSTS, MOCK_CUSTOMERS } from '@/lib/mock-data';

const { Title } = Typography;

export default function AdminDashboard() {
  const stats = [
    { title: 'Tổng bài viết', value: MOCK_POSTS.length, icon: <FileTextOutlined />, color: '#1890ff' },
    { title: 'Khách hàng', value: MOCK_CUSTOMERS.length, icon: <UserOutlined />, color: '#52c41a' },
    { title: 'Doanh thu (dự kiến)', value: '50M', icon: <DollarOutlined />, color: '#faad14' },
    { title: 'Tăng trưởng', value: '12%', icon: <RiseOutlined />, color: '#eb2f96' },
  ];

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Danh mục', dataIndex: ['category', 'name'], key: 'category' },
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
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  return (
    <div>
      <Title level={2} className="mb-6">Dashboard Overview</Title>
      
      <Row gutter={[16, 16]} className="mb-8">
        {stats.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card bordered={false} className="shadow-sm">
              <Statistic
                title={item.title}
                value={item.value}
                prefix={item.icon}
                valueStyle={{ color: item.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Bài viết mới nhất" bordered={false} className="shadow-sm">
            <Table
              columns={columns}
              dataSource={MOCK_POSTS.map(p => ({ ...p, key: p.id }))}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

'use client';

import { Empty, Button, Card, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Card className="w-full max-w-2xl text-center shadow-md">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="space-y-4">
              <Title level={3}>Quản lý Khách hàng (Phase 2)</Title>
              <Paragraph className="text-slate-500">
                Khu vực này đang được phát triển cho Giai đoạn 2 của dự án. 
                Hệ thống CRM sẽ cho phép bạn quản lý thông tin khách hàng, lịch sử giao dịch và tương tác.
              </Paragraph>
            </div>
          }
        >
          <Button type="primary" icon={<UserAddOutlined />} disabled>
            Tính năng đang phát triển
          </Button>
        </Empty>
      </Card>
    </div>
  );
}

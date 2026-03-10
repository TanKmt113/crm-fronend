'use client';

import { Empty, Button, Card, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function AdminReceivablesPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Card className="w-full max-w-2xl text-center shadow-md">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="space-y-4">
              <Title level={3}>Quản lý Công nợ (Phase 2)</Title>
              <Paragraph className="text-slate-500">
                Khu vực này đang được phát triển cho Giai đoạn 2 của dự án.
                Hệ thống sẽ hỗ trợ theo dõi công nợ, nhắc nợ tự động và báo cáo tài chính.
              </Paragraph>
            </div>
          }
        >
          <Button type="primary" icon={<DollarOutlined />} disabled>
            Tính năng đang phát triển
          </Button>
        </Empty>
      </Card>
    </div>
  );
}

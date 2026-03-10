import { useState } from 'react';
import { List, Button, Typography, Space } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import type { HomepageSection } from '@/types';

const { Text } = Typography;

interface SortableSectionsProps {
  sections: HomepageSection[];
  onSectionsChange: (sections: HomepageSection[]) => void;
}

export default function SortableSections({
  sections,
  onSectionsChange,
}: SortableSectionsProps) {
  const [draggedItem, setDraggedItem] = useState<HomepageSection | null>(null);

  const handleDragStart = (e: React.DragEvent, section: HomepageSection) => {
    setDraggedItem(section);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSection: HomepageSection) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetSection.id) return;

    const newSections = [...sections];
    const draggedIdx = newSections.findIndex((s) => s.id === draggedItem.id);
    const targetIdx = newSections.findIndex((s) => s.id === targetSection.id);

    // Swap positions
    newSections.splice(draggedIdx, 1);
    newSections.splice(targetIdx, 0, draggedItem);

    // Update order
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    onSectionsChange(updatedSections);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const toggleSection = (id: string) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, enabled: !section.enabled } : section
    );
    onSectionsChange(updatedSections);
  };

  return (
    <List
      size="large"
      dataSource={sections}
      renderItem={(section) => (
        <List.Item
          draggable
          onDragStart={(e) => handleDragStart(e, section)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, section)}
          onDragEnd={handleDragEnd}
          className={`cursor-move rounded border border-gray-200 bg-white p-4 transition-all hover:border-blue-400 hover:shadow-md ${
            draggedItem?.id === section.id ? 'opacity-50' : ''
          }`}
          style={{ marginBottom: '12px' }}
          actions={[
            <Button
              key="toggle"
              type={section.enabled ? 'primary' : 'default'}
              onClick={() => toggleSection(section.id)}
            >
              {section.enabled ? 'Đang hiển thị' : 'Đã ẩn'}
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100 text-blue-600">
                <DragOutlined />
              </div>
            }
            title={
              <Space>
                <Text strong>#{section.order}</Text>
                <Text>{section.name}</Text>
              </Space>
            }
            description={
              <Text type="secondary">
                {section.enabled
                  ? 'Section này đang được hiển thị'
                  : 'Section này đang bị ẩn'}
              </Text>
            }
          />
        </List.Item>
      )}
    />
  );
}

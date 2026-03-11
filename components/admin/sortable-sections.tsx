import { useState } from 'react';
import { Button, Typography, Space } from 'antd';
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
    <div className="flex flex-col gap-3">
      {sections.map((section) => (
        <div
          key={section.id}
          draggable
          onDragStart={(e) => handleDragStart(e, section)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, section)}
          onDragEnd={handleDragEnd}
          className={`flex cursor-move items-center justify-between rounded border border-gray-200 bg-white p-4 transition-all hover:border-blue-400 hover:shadow-md ${
            draggedItem?.id === section.id ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100 text-blue-600">
              <DragOutlined />
            </div>
            <div>
              <Space>
                <Text strong>#{section.order}</Text>
                <Text>{section.name}</Text>
              </Space>
              <div>
                <Text type="secondary">
                  {section.enabled
                    ? 'Section này đang được hiển thị'
                    : 'Section này đang bị ẩn'}
                </Text>
              </div>
            </div>
          </div>
          <Button
            type={section.enabled ? 'primary' : 'default'}
            onClick={() => toggleSection(section.id)}
          >
            {section.enabled ? 'Đang hiển thị' : 'Đã ẩn'}
          </Button>
        </div>
      ))}
    </div>
  );
}

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Upload,
  Button,
  Input,
  Select,
  Space,
  Typography,
  Tooltip,
  Modal,
  Popconfirm,
  Image,
  Tag,
  Divider,
  Empty,
  Spin,
  Table,
  Checkbox,
  Form,
  Drawer,
  Pagination,
  Progress,
} from 'antd';
import type { UploadProps } from 'antd';
import {
  CloudUploadOutlined,
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  VideoCameraOutlined,
  CheckSquareOutlined,
  PictureOutlined,
  FileZipOutlined,
} from '@ant-design/icons';
import { toast } from 'sonner';
import { filesLocalControllerUploadFileV1 } from '@/lib/api/generated/clients';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const STORAGE_KEY = 'crm_media_library';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
const PAGE_SIZE = 24;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MediaItem {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
  alt: string;
  caption: string;
  apiFileId?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function resolveUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function getFileTypeIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return <PictureOutlined className="text-blue-500" />;
  if (mimeType.startsWith('video/')) return <VideoCameraOutlined className="text-purple-500" />;
  if (mimeType === 'application/pdf') return <FilePdfOutlined className="text-red-500" />;
  if (mimeType.includes('word')) return <FileWordOutlined className="text-blue-700" />;
  if (mimeType.includes('excel') || mimeType.includes('sheet')) return <FileExcelOutlined className="text-green-600" />;
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) return <FileZipOutlined className="text-yellow-600" />;
  return <FileOutlined className="text-gray-500" />;
}

function getFileTypeLabel(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'Hình ảnh';
  if (mimeType.startsWith('video/')) return 'Video';
  if (mimeType === 'application/pdf') return 'PDF';
  if (mimeType.includes('word')) return 'Word';
  if (mimeType.includes('excel') || mimeType.includes('sheet')) return 'Excel';
  if (mimeType.includes('zip') || mimeType.includes('rar')) return 'Nén';
  return 'Tập tin';
}

function getTypeColor(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'blue';
  if (mimeType.startsWith('video/')) return 'purple';
  if (mimeType === 'application/pdf') return 'red';
  if (mimeType.includes('word')) return 'geekblue';
  if (mimeType.includes('excel')) return 'green';
  return 'default';
}

function loadFromStorage(): MediaItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MediaItem[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: MediaItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [detailOpen, setDetailOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [editForm] = Form.useForm();

  // Load from localStorage on mount
  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  const selectedItem = useMemo(
    () => items.find((i) => i.id === selectedId) ?? null,
    [items, selectedId],
  );

  // Sync form values when selected item changes
  useEffect(() => {
    if (selectedItem) {
      editForm.setFieldsValue({ alt: selectedItem.alt, caption: selectedItem.caption });
    }
  }, [selectedItem, editForm]);

  // Filtered + sorted items
  const filtered = useMemo(() => {
    let list = [...items].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    );
    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (i) => i.originalName.toLowerCase().includes(q) || i.name.toLowerCase().includes(q),
      );
    }
    if (typeFilter !== 'all') {
      list = list.filter((i) => {
        if (typeFilter === 'image') return i.mimeType.startsWith('image/');
        if (typeFilter === 'video') return i.mimeType.startsWith('video/');
        if (typeFilter === 'document')
          return !i.mimeType.startsWith('image/') && !i.mimeType.startsWith('video/');
        return true;
      });
    }
    return list;
  }, [items, searchText, typeFilter]);

  const paged = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );

  // ── Upload handler ──────────────────────────────────────────────────────────

  const handleUpload = useCallback(async (file: File) => {
    const tempId = crypto.randomUUID();
    setUploading(true);
    setUploadProgress((prev) => ({ ...prev, [tempId]: 0 }));

    try {
      const result = await filesLocalControllerUploadFileV1({ file });
      const rawPath = result?.file?.path ?? '';
      const url = resolveUrl(rawPath);

      const newItem: MediaItem = {
        id: crypto.randomUUID(),
        name: file.name.replace(/\.[^.]+$/, ''),
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url,
        uploadedAt: new Date().toISOString(),
        alt: '',
        caption: '',
        apiFileId: result?.file?.id,
      };

      setItems((prev) => {
        const next = [newItem, ...prev];
        saveToStorage(next);
        return next;
      });

      toast.success(`Đã tải lên "${file.name}"`);
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? `Tải lên "${file.name}" thất bại!`);
    } finally {
      setUploading(false);
      setUploadProgress((prev) => {
        const next = { ...prev };
        delete next[tempId];
        return next;
      });
    }
  }, []);

  const uploadProps: UploadProps = {
    multiple: true,
    showUploadList: false,
    beforeUpload: (file) => {
      const maxMB = 20;
      if (file.size / 1024 / 1024 > maxMB) {
        toast.error(`"${file.name}" vượt quá ${maxMB}MB!`);
        return false;
      }
      handleUpload(file);
      return false;
    },
  };

  // ── Actions ─────────────────────────────────────────────────────────────────

  const handleSelectItem = (id: string) => {
    setSelectedId(id);
    setDetailOpen(true);
  };

  const handleToggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDelete = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== id);
        saveToStorage(next);
        return next;
      });
      if (selectedId === id) {
        setSelectedId(null);
        setDetailOpen(false);
      }
      setCheckedIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      toast.success('Đã xoá tệp!');
    },
    [selectedId],
  );

  const handleBulkDelete = () => {
    Modal.confirm({
      title: `Xoá ${checkedIds.size} tệp đã chọn?`,
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk: () => {
        setItems((prev) => {
          const next = prev.filter((i) => !checkedIds.has(i.id));
          saveToStorage(next);
          return next;
        });
        setCheckedIds(new Set());
        toast.success('Đã xoá các tệp!');
      },
    });
  };

  const handleCopyUrl = (url: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(url).then(() => toast.success('Đã sao chép URL!'));
  };

  const handleSaveDetail = (values: { alt: string; caption: string }) => {
    setItems((prev) => {
      const next = prev.map((i) => (i.id === selectedId ? { ...i, ...values } : i));
      saveToStorage(next);
      return next;
    });
    toast.success('Đã lưu thông tin!');
  };

  const handleSelectAll = () => setCheckedIds(new Set(filtered.map((i) => i.id)));
  const handleDeselectAll = () => setCheckedIds(new Set());

  // ── Grid item ───────────────────────────────────────────────────────────────

  const renderGridItem = (item: MediaItem) => {
    const isChecked = checkedIds.has(item.id);
    const isSelected = selectedId === item.id;
    const isImage = item.mimeType.startsWith('image/');

    return (
      <div
        key={item.id}
        className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 bg-gray-50 transition-all duration-150 ${
          isSelected
            ? 'border-blue-500 shadow-md ring-2 ring-blue-200'
            : isChecked
              ? 'border-blue-400'
              : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
        }`}
        onClick={() => handleSelectItem(item.id)}
      >
        {/* Thumbnail area */}
        <div className="relative w-full" style={{ paddingBottom: '75%' }}>
          {isImage ? (
            <img
              src={item.url}
              alt={item.alt || item.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
              <span className="text-4xl">{getFileTypeIcon(item.mimeType)}</span>
              <span className="mt-1 text-xs text-gray-400">
                {item.mimeType.split('/')[1]?.toUpperCase()}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Tooltip title="Xem chi tiết">
              <Button size="small" type="primary" ghost icon={<EyeOutlined />} />
            </Tooltip>
            <Tooltip title="Sao chép URL">
              <Button
                size="small"
                type="primary"
                ghost
                icon={<CopyOutlined />}
                onClick={(e) => handleCopyUrl(item.url, e)}
              />
            </Tooltip>
          </div>
        </div>

        {/* Checkbox */}
        <div
          className={`absolute left-1.5 top-1.5 z-10 transition-opacity ${
            isChecked || checkedIds.size > 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          onClick={(e) => handleToggleCheck(item.id, e)}
        >
          <div
            className={`flex h-5 w-5 items-center justify-center rounded border-2 shadow-sm ${
              isChecked ? 'border-blue-500 bg-blue-500' : 'border-gray-400 bg-white'
            }`}
          >
            {isChecked && <span className="text-xs text-white">✓</span>}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-white px-2 py-1.5">
          <p className="truncate text-xs font-medium text-gray-800" title={item.originalName}>
            {item.name}
          </p>
          <p className="text-xs text-gray-400">{formatBytes(item.size)}</p>
        </div>
      </div>
    );
  };

  // ── List columns ────────────────────────────────────────────────────────────

  const columns = [
    {
      title: (
        <Checkbox
          checked={checkedIds.size === filtered.length && filtered.length > 0}
          indeterminate={checkedIds.size > 0 && checkedIds.size < filtered.length}
          onChange={(e) => (e.target.checked ? handleSelectAll() : handleDeselectAll())}
        />
      ),
      width: 40,
      render: (_: unknown, record: MediaItem) => (
        <Checkbox
          checked={checkedIds.has(record.id)}
          onChange={() => {
            setCheckedIds((prev) => {
              const next = new Set(prev);
              if (next.has(record.id)) next.delete(record.id);
              else next.add(record.id);
              return next;
            });
          }}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      title: 'Xem trước',
      width: 64,
      render: (_: unknown, record: MediaItem) =>
        record.mimeType.startsWith('image/') ? (
          <img
            src={record.url}
            alt={record.alt || record.name}
            className="h-12 w-12 rounded object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 text-xl">
            {getFileTypeIcon(record.mimeType)}
          </div>
        ),
    },
    {
      title: 'Tên tệp',
      dataIndex: 'originalName',
      key: 'originalName',
      ellipsis: true,
      render: (name: string, record: MediaItem) => (
        <div>
          <div className="font-medium">{name}</div>
          {record.alt && <div className="text-xs text-gray-400">Alt: {record.alt}</div>}
        </div>
      ),
    },
    {
      title: 'Loại',
      width: 100,
      render: (_: unknown, record: MediaItem) => (
        <Tag color={getTypeColor(record.mimeType)}>{getFileTypeLabel(record.mimeType)}</Tag>
      ),
    },
    {
      title: 'Kích thước',
      width: 90,
      render: (_: unknown, record: MediaItem) => formatBytes(record.size),
    },
    {
      title: 'Ngày tải lên',
      width: 140,
      render: (_: unknown, record: MediaItem) =>
        new Date(record.uploadedAt).toLocaleString('vi-VN'),
    },
    {
      title: 'Thao tác',
      width: 130,
      render: (_: unknown, record: MediaItem) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Chi tiết">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleSelectItem(record.id)}
            />
          </Tooltip>
          <Tooltip title="Sao chép URL">
            <Button
              size="small"
              icon={<CopyOutlined />}
              onClick={() => handleCopyUrl(record.url)}
            />
          </Tooltip>
          <Popconfirm
            title="Xoá tệp này?"
            okText="Xoá"
            okType="danger"
            cancelText="Huỷ"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // ── Stats ───────────────────────────────────────────────────────────────────

  const totalSize = items.reduce((acc, i) => acc + i.size, 0);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Thư viện Media
          </Title>
          <Text type="secondary" className="text-sm">
            {items.length} tệp · {formatBytes(totalSize)} đã dùng
          </Text>
        </div>
        <Space wrap>
          {checkedIds.size > 0 && (
            <Button danger icon={<DeleteOutlined />} onClick={handleBulkDelete}>
              Xoá {checkedIds.size} tệp
            </Button>
          )}
          <Upload {...uploadProps}>
            <Button type="primary" icon={<UploadOutlined />} loading={uploading}>
              Tải lên
            </Button>
          </Upload>
        </Space>
      </div>

      {/* Upload dragger */}
      <Dragger {...uploadProps} className="!bg-blue-50/50">
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined style={{ fontSize: 40, color: '#60a5fa' }} />
        </p>
        <p className="ant-upload-text font-medium">Kéo thả tệp vào đây để tải lên</p>
        <p className="ant-upload-hint text-gray-400">
          Hỗ trợ hình ảnh, video, PDF, Word, Excel. Tối đa 20MB mỗi tệp.
        </p>
      </Dragger>

      {/* Upload progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-1">
          {Object.entries(uploadProgress).map(([id, pct]) => (
            <Progress key={id} percent={pct} size="small" />
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <Input
          placeholder="Tìm kiếm tên tệp..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1);
          }}
          style={{ width: 240 }}
          allowClear
        />
        <Select
          value={typeFilter}
          onChange={(v) => {
            setTypeFilter(v);
            setPage(1);
          }}
          style={{ width: 150 }}
          options={[
            { label: 'Tất cả loại', value: 'all' },
            { label: 'Hình ảnh', value: 'image' },
            { label: 'Video', value: 'video' },
            { label: 'Tài liệu', value: 'document' },
          ]}
        />

        <Text type="secondary" className="ml-auto text-sm">
          {filtered.length} tệp
        </Text>

        <Space.Compact>
          <Button
            icon={<AppstoreOutlined />}
            type={viewMode === 'grid' ? 'primary' : 'default'}
            onClick={() => setViewMode('grid')}
            title="Dạng lưới"
          />
          <Button
            icon={<UnorderedListOutlined />}
            type={viewMode === 'list' ? 'primary' : 'default'}
            onClick={() => setViewMode('list')}
            title="Dạng danh sách"
          />
        </Space.Compact>
      </div>

      {/* Bulk select bar */}
      {checkedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2">
          <CheckSquareOutlined className="text-blue-500" />
          <Text>
            Đã chọn <strong>{checkedIds.size}</strong> tệp
          </Text>
          <Button size="small" onClick={handleDeselectAll}>
            Bỏ chọn tất cả
          </Button>
          <Button size="small" onClick={handleSelectAll}>
            Chọn tất cả ({filtered.length})
          </Button>
        </div>
      )}

      {/* Main content */}
      <Spin spinning={uploading} tip="Đang tải lên...">
        {filtered.length === 0 ? (
          <Empty
            description={
              items.length === 0
                ? 'Thư viện trống. Hãy tải lên tệp đầu tiên!'
                : 'Không tìm thấy tệp phù hợp.'
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            {items.length === 0 && (
              <Upload {...uploadProps}>
                <Button type="primary" icon={<UploadOutlined />}>
                  Tải lên tệp đầu tiên
                </Button>
              </Upload>
            )}
          </Empty>
        ) : viewMode === 'grid' ? (
          <>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))' }}
            >
              {paged.map(renderGridItem)}
            </div>
            {filtered.length > PAGE_SIZE && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  current={page}
                  pageSize={PAGE_SIZE}
                  total={filtered.length}
                  onChange={(p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  showSizeChanger={false}
                  showTotal={(total) => `${total} tệp`}
                />
              </div>
            )}
          </>
        ) : (
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="id"
            size="small"
            pagination={{
              pageSize: PAGE_SIZE,
              current: page,
              onChange: setPage,
              showSizeChanger: false,
              showTotal: (total) => `${total} tệp`,
            }}
            onRow={(record) => ({
              onClick: () => handleSelectItem(record.id),
              className: 'cursor-pointer hover:bg-blue-50',
            })}
          />
        )}
      </Spin>

      {/* Detail Drawer */}
      <Drawer
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedId(null);
        }}
        title={
          <div className="flex items-center gap-2">
            <PictureOutlined />
            <span>Chi tiết tệp</span>
          </div>
        }
        size="default"
        extra={
          selectedItem && (
            <Popconfirm
              title="Xoá tệp này?"
              description="Hành động này không thể hoàn tác."
              okText="Xoá"
              okType="danger"
              cancelText="Huỷ"
              onConfirm={() => handleDelete(selectedItem.id)}
            >
              <Button danger size="small" icon={<DeleteOutlined />}>
                Xoá
              </Button>
            </Popconfirm>
          )
        }
      >
        {selectedItem ? (
          <div className="space-y-4">
            {/* Preview */}
            <div className="flex min-h-[180px] items-center justify-center rounded-lg bg-gray-100 p-4">
              {selectedItem.mimeType.startsWith('image/') ? (
                <Image
                  src={selectedItem.url}
                  alt={selectedItem.alt || selectedItem.name}
                  style={{ maxHeight: 280, objectFit: 'contain' }}
                />
              ) : selectedItem.mimeType.startsWith('video/') ? (
                <video
                  src={selectedItem.url}
                  controls
                  className="max-h-[280px] max-w-full rounded"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <span className="text-6xl">{getFileTypeIcon(selectedItem.mimeType)}</span>
                  <Text type="secondary">{selectedItem.mimeType}</Text>
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="space-y-2 rounded-lg bg-gray-50 p-3 text-sm">
              <div className="flex items-start justify-between gap-2">
                <Text type="secondary" className="shrink-0">
                  Tên tệp
                </Text>
                <Text className="text-right font-medium" style={{ wordBreak: 'break-all' }}>
                  {selectedItem.originalName}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text type="secondary">Loại</Text>
                <Tag color={getTypeColor(selectedItem.mimeType)}>
                  {getFileTypeLabel(selectedItem.mimeType)}
                </Tag>
              </div>
              <div className="flex items-center justify-between">
                <Text type="secondary">MIME</Text>
                <Text className="font-mono text-xs">{selectedItem.mimeType}</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text type="secondary">Kích thước</Text>
                <Text>{formatBytes(selectedItem.size)}</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text type="secondary">Ngày tải lên</Text>
                <Text>{new Date(selectedItem.uploadedAt).toLocaleString('vi-VN')}</Text>
              </div>
            </div>

            <Divider className="my-0" />

            {/* URL copy */}
            <div>
              <Text type="secondary" className="mb-1 block text-sm">
                URL tệp
              </Text>
              <div className="flex gap-2">
                <Input
                  value={selectedItem.url}
                  readOnly
                  size="small"
                  className="flex-1 font-mono text-xs"
                />
                <Tooltip title="Sao chép URL">
                  <Button
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={() => handleCopyUrl(selectedItem.url)}
                  >
                    Sao chép
                  </Button>
                </Tooltip>
              </div>
            </div>

            <Divider className="my-0" />

            {/* Editable metadata */}
            <Form form={editForm} layout="vertical" onFinish={handleSaveDetail} size="small">
              <Form.Item name="alt" label="Văn bản thay thế (Alt text)">
                <Input placeholder="Mô tả nội dung ảnh..." />
              </Form.Item>
              <Form.Item name="caption" label="Chú thích (Caption)">
                <Input.TextArea rows={2} placeholder="Chú thích hiển thị dưới ảnh..." />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Lưu thông tin
              </Button>
            </Form>

            <Divider className="my-0" />

            {/* Quick navigation */}
            <div className="flex justify-between">
              {(() => {
                const idx = items.findIndex((i) => i.id === selectedId);
                const prev = idx > 0 ? items[idx - 1] : null;
                const next = idx < items.length - 1 ? items[idx + 1] : null;
                return (
                  <>
                    <Button
                      size="small"
                      disabled={!prev}
                      onClick={() => prev && handleSelectItem(prev.id)}
                    >
                      ← Trước
                    </Button>
                    <Button
                      size="small"
                      disabled={!next}
                      onClick={() => next && handleSelectItem(next.id)}
                    >
                      Sau →
                    </Button>
                  </>
                );
              })()}
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}

'use client';

/**
 * MediaPickerModal — reusable modal for picking a media item from the library.
 *
 * Usage:
 *   <MediaPickerModal
 *     open={open}
 *     onClose={() => setOpen(false)}
 *     onSelect={(item) => setImageUrl(item.url)}
 *   />
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Modal,
  Upload,
  Button,
  Input,
  Select,
  Typography,
  Tooltip,
  Spin,
  Empty,
  Pagination,
} from 'antd';
import type { UploadProps } from 'antd';
import {
  CloudUploadOutlined,
  SearchOutlined,
  UploadOutlined,
  PictureOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  VideoCameraOutlined,
  FileZipOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { toast } from 'sonner';
import { filesLocalControllerUploadFileV1 } from '@/lib/api/generated/clients';
import type { MediaItem } from '@/app/admin/media/page';

const { Dragger } = Upload;
const { Text } = Typography;

const STORAGE_KEY = 'crm_media_library';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
const PAGE_SIZE = 20;

// ─── Helpers (duplicated to avoid coupling — keep this component self-contained) ──

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
  if (mimeType.includes('excel') || mimeType.includes('sheet'))
    return <FileExcelOutlined className="text-green-600" />;
  if (mimeType.includes('zip') || mimeType.includes('rar'))
    return <FileZipOutlined className="text-yellow-600" />;
  return <FileOutlined className="text-gray-500" />;
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

// ─── Props ────────────────────────────────────────────────────────────────────

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  /** Called with the chosen MediaItem. Can be called multiple times if multiSelect=true. */
  onSelect: (item: MediaItem) => void;
  /** If true, show a Confirm button instead of selecting on click. Default: false */
  multiSelect?: boolean;
  /** Filter to only show certain MIME types, e.g. 'image' | 'video' | 'document' */
  accept?: 'image' | 'video' | 'document' | 'all';
  title?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MediaPickerModal({
  open,
  onClose,
  onSelect,
  accept = 'all',
  title = 'Chọn từ thư viện Media',
}: MediaPickerModalProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>(accept === 'all' ? 'all' : accept);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);

  // Reload items whenever modal opens
  useEffect(() => {
    if (open) {
      setItems(loadFromStorage());
      setSelectedId(null);
      setSearchText('');
      setPage(1);
    }
  }, [open]);

  const filtered = useMemo(() => {
    let list = [...items].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    );
    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter((i) => i.originalName.toLowerCase().includes(q));
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

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const result = await filesLocalControllerUploadFileV1({ file });
      const url = resolveUrl(result?.file?.path ?? '');
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
      setSelectedId(newItem.id);
      toast.success(`Đã tải lên "${file.name}"`);
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? `Tải lên "${file.name}" thất bại!`);
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadProps: UploadProps = {
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      if (file.size / 1024 / 1024 > 20) {
        toast.error(`"${file.name}" vượt quá 20MB!`);
        return false;
      }
      handleUpload(file);
      return false;
    },
  };

  const handleConfirm = () => {
    const item = items.find((i) => i.id === selectedId);
    if (item) {
      onSelect(item);
      onClose();
    }
  };

  const handleClickItem = (item: MediaItem) => {
    setSelectedId(item.id);
  };

  const handleDoubleClickItem = (item: MediaItem) => {
    onSelect(item);
    onClose();
  };

  const selectedItem = items.find((i) => i.id === selectedId);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={title}
      width={860}
      footer={
        <div className="flex items-center justify-between">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} loading={uploading} size="small">
              Tải lên tệp mới
            </Button>
          </Upload>
          <div className="flex gap-2">
            <Button onClick={onClose}>Huỷ</Button>
            <Button type="primary" disabled={!selectedId} onClick={handleConfirm}>
              Chọn{selectedItem ? ` "${selectedItem.name}"` : ''}
            </Button>
          </div>
        </div>
      }
      styles={{ body: { padding: '12px 16px', maxHeight: '70vh', overflowY: 'auto' } }}
      destroyOnHidden
    >
      {/* Upload dragger — compact */}
      <Dragger
        {...uploadProps}
        style={{ padding: '8px', marginBottom: 12 }}
        className="!bg-blue-50/40"
      >
        <div className="flex items-center justify-center gap-2 py-1">
          <CloudUploadOutlined className="text-blue-400 text-xl" />
          <Text className="text-sm">Kéo thả tệp vào đây hoặc click để tải lên</Text>
        </div>
      </Dragger>

      {/* Filters */}
      <div className="mb-3 flex items-center gap-2">
        <Input
          size="small"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1);
          }}
          allowClear
          style={{ width: 200 }}
        />
        <Select
          size="small"
          value={typeFilter}
          onChange={(v) => {
            setTypeFilter(v);
            setPage(1);
          }}
          style={{ width: 140 }}
          options={[
            { label: 'Tất cả loại', value: 'all' },
            { label: 'Hình ảnh', value: 'image' },
            { label: 'Video', value: 'video' },
            { label: 'Tài liệu', value: 'document' },
          ]}
        />
        <Text type="secondary" className="ml-auto text-xs">
          {filtered.length} tệp · Nhấp đúp để chọn nhanh
        </Text>
      </div>

      {/* Grid */}
      <Spin spinning={uploading}>
        {filtered.length === 0 ? (
          <Empty description="Không có tệp nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}
            >
              {paged.map((item) => {
                const isSelected = selectedId === item.id;
                const isImage = item.mimeType.startsWith('image/');
                return (
                  <Tooltip key={item.id} title={item.originalName} placement="top">
                    <div
                      className={`relative cursor-pointer overflow-hidden rounded-md border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 shadow-md ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => handleClickItem(item)}
                      onDoubleClick={() => handleDoubleClickItem(item)}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full bg-gray-100" style={{ paddingBottom: '80%' }}>
                        {isImage ? (
                          <img
                            src={item.url}
                            alt={item.alt || item.name}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl">{getFileTypeIcon(item.mimeType)}</span>
                          </div>
                        )}

                        {/* Selected checkmark */}
                        {isSelected && (
                          <div className="absolute right-1 top-1">
                            <CheckCircleFilled className="text-blue-500 text-lg drop-shadow" />
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <div className="bg-white px-1.5 py-1">
                        <p
                          className="truncate text-xs font-medium text-gray-700"
                          title={item.originalName}
                        >
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">{formatBytes(item.size)}</p>
                      </div>
                    </div>
                  </Tooltip>
                );
              })}
            </div>

            {filtered.length > PAGE_SIZE && (
              <div className="mt-3 flex justify-center">
                <Pagination
                  current={page}
                  pageSize={PAGE_SIZE}
                  total={filtered.length}
                  onChange={setPage}
                  size="small"
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </Spin>
    </Modal>
  );
}

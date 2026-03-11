'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useCallback } from 'react';
import { Button, Tooltip, Divider } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  LinkOutlined,
  PictureOutlined,
  UndoOutlined,
  RedoOutlined,
  CodeOutlined,
  MinusOutlined,
} from '@ant-design/icons';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Bắt đầu viết nội dung tại đây...',
  minHeight = 400,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ HTMLAttributes: { class: 'max-w-full rounded-lg my-4' } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[inherit] prose prose-slate max-w-none px-5 py-4',
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  // Sync external value changes (e.g. when form is prefilled)
  useEffect(() => {
    if (!editor) return;
    if (value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Nhập URL ảnh:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href ?? '';
    const url = window.prompt('Nhập URL liên kết:', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const ToolbarBtn = ({
    active,
    onClick,
    title,
    icon,
    disabled,
  }: {
    active?: boolean;
    onClick: () => void;
    title: string;
    icon: React.ReactNode;
    disabled?: boolean;
  }) => (
    <Tooltip title={title} mouseEnterDelay={0.6}>
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        disabled={disabled}
        className={`flex h-8 w-8 items-center justify-center rounded transition-colors text-sm
          ${active
            ? 'bg-blue-100 text-blue-700'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
          disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {icon}
      </button>
    </Tooltip>
  );

  const HeadingSelect = () => (
    <select
      value={
        editor.isActive('heading', { level: 1 }) ? '1'
          : editor.isActive('heading', { level: 2 }) ? '2'
          : editor.isActive('heading', { level: 3 }) ? '3'
          : '0'
      }
      onChange={(e) => {
        const val = Number(e.target.value);
        if (val === 0) {
          editor.chain().focus().setParagraph().run();
        } else {
          editor.chain().focus().toggleHeading({ level: val as Level }).run();
        }
      }}
      className="h-8 rounded border border-slate-200 bg-white px-2 text-sm text-slate-700 outline-none focus:border-blue-400"
    >
      <option value="0">Đoạn văn</option>
      <option value="1">Tiêu đề 1</option>
      <option value="2">Tiêu đề 2</option>
      <option value="3">Tiêu đề 3</option>
    </select>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-3 py-2">
        {/* Undo / Redo */}
        <ToolbarBtn
          title="Hoàn tác (Ctrl+Z)"
          icon={<UndoOutlined />}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        />
        <ToolbarBtn
          title="Làm lại (Ctrl+Y)"
          icon={<RedoOutlined />}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        />

        <div className="mx-1 h-5 w-px bg-slate-300" />

        {/* Heading */}
        <HeadingSelect />

        <div className="mx-1 h-5 w-px bg-slate-300" />

        {/* Text formatting */}
        <ToolbarBtn
          title="In đậm (Ctrl+B)"
          icon={<BoldOutlined />}
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarBtn
          title="In nghiêng (Ctrl+I)"
          icon={<ItalicOutlined />}
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarBtn
          title="Gạch chân (Ctrl+U)"
          icon={<UnderlineOutlined />}
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarBtn
          title="Gạch ngang"
          icon={<StrikethroughOutlined />}
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <ToolbarBtn
          title="Code inline"
          icon={<CodeOutlined />}
          active={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
        />

        <div className="mx-1 h-5 w-px bg-slate-300" />

        {/* Alignment */}
        <ToolbarBtn
          title="Căn trái"
          icon={<AlignLeftOutlined />}
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
        <ToolbarBtn
          title="Căn giữa"
          icon={<AlignCenterOutlined />}
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
        <ToolbarBtn
          title="Căn phải"
          icon={<AlignRightOutlined />}
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />

        <div className="mx-1 h-5 w-px bg-slate-300" />

        {/* Lists */}
        <ToolbarBtn
          title="Danh sách có thứ tự"
          icon={<OrderedListOutlined />}
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarBtn
          title="Danh sách không thứ tự"
          icon={<UnorderedListOutlined />}
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />

        <div className="mx-1 h-5 w-px bg-slate-300" />

        {/* Link & Image */}
        <ToolbarBtn
          title="Chèn liên kết"
          icon={<LinkOutlined />}
          active={editor.isActive('link')}
          onClick={setLink}
        />
        <ToolbarBtn
          title="Chèn ảnh"
          icon={<PictureOutlined />}
          onClick={addImage}
        />
        <ToolbarBtn
          title="Đường kẻ ngang"
          icon={<MinusOutlined />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>

      {/* Editor area */}
      <div style={{ minHeight }} className="bg-white cursor-text" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} style={{ minHeight }} />
      </div>

      {/* Word count */}
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-1.5 text-right text-xs text-slate-400">
        {editor.storage.characterCount?.characters?.() ?? editor.getText().length} ký tự
        &nbsp;·&nbsp;
        {editor.getText().trim().split(/\s+/).filter(Boolean).length} từ
      </div>
    </div>
  );
}

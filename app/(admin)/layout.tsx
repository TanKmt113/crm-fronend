'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Avatar, Space } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  DollarOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Simple auth check
    const token = localStorage.getItem('auth_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [mounted, router, pathname]);

  if (!mounted) return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: 'blog',
      icon: <FileTextOutlined />,
      label: 'Quản lý Blog',
      children: [
        {
          key: '/admin/posts',
          label: <Link href="/admin/posts">Bài viết</Link>,
        },
        {
          key: '/admin/categories',
          label: <Link href="/admin/categories">Danh mục</Link>,
        },
      ],
    },
    {
      key: '/admin/customers',
      icon: <UserOutlined />,
      label: <Link href="/admin/customers">Khách hàng (Phase 2)</Link>,
    },
    {
      key: '/admin/receivables',
      icon: <DollarOutlined />,
      label: <Link href="/admin/receivables">Công nợ (Phase 2)</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      key: 'public-site',
      icon: <GlobalOutlined />,
      label: <Link href="/" target="_blank">Xem Website</Link>,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/admin/login');
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: 'Hồ sơ cá nhân',
      },
      {
        key: 'logout',
        label: 'Đăng xuất',
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="shadow-sm">
        <div className="flex h-16 items-center justify-center border-b font-bold text-blue-600">
          {collapsed ? 'CB' : 'CORPBASE ADMIN'}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          items={menuItems}
          className="border-none"
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex items-center justify-between px-4 shadow-sm">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div className="flex items-center gap-4">
            <Dropdown menu={userMenu} placement="bottomRight">
              <Space className="cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <span className="hidden md:inline">Administrator</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'initial',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

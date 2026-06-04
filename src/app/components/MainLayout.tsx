"use client";
import React, { useEffect, useState } from 'react';
import {
  Gamepad2,
  MonitorPlay,
  TrendingUp,
  Bitcoin,
  Landmark,
  Music,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const NAV_ITEMS = [
  { id: 'home', icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { id: 'steam', icon: Gamepad2, label: 'Steam', path: '/steam' },
  { id: 'youtube', icon: MonitorPlay, label: 'YouTube', path: '/youtube' },
  { id: 'music', icon: Music, label: 'Music', path: '/music' },
  { id: 'crypto', icon: Bitcoin, label: 'Crypto', path: '/crypto' },
  { id: 'exchange', icon: TrendingUp, label: 'Exchange', path: '/exchange' },
  { id: 'politics', icon: Landmark, label: 'Politics', path: '/politics' },
];
export function MainLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; username: string; avatarUrl?: string | null } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);
  const closeMobile = () => setMobileOpen(false);
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-4 pt-5 pb-6">
        <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <span className="text-accent font-bold text-sm">WD</span>
          </div>
          {!collapsed && (
            <span className="text-sm font-bold text-primary tracking-wide truncate">WorldWideDashBoard</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden xl:flex items-center justify-center w-6 h-6 rounded text-muted hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={closeMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                active
                  ? 'bg-accent/10 text-accent'
                  : 'text-secondary hover:text-primary'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-3 pb-4 space-y-0.5">
        {user ? (
          <>
            <Link
              href="/settings"
              onClick={closeMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                isActive('/settings')
                  ? 'bg-accent/10 text-accent'
                  : 'text-secondary hover:text-primary'
              }`}
              title={collapsed ? 'Settings' : undefined}
            >
              <Settings size={18} className="shrink-0" />
              {!collapsed && <span>Settings</span>}
            </Link>
            <div className={`flex items-center gap-3 px-3 py-2.5 ${collapsed ? 'justify-center' : ''}`}>
              <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={14} className="text-accent" />
                )}
              </div>
              {!collapsed && (
                <span className="text-[13px] font-medium text-primary truncate flex-1">
                  {user.username}
                </span>
              )}
              {!collapsed && (
                <button
                  onClick={handleLogout}
                  className="text-muted hover:text-danger transition-colors"
                  title="Logout"
                >
                  <LogOut size={15} />
                </button>
              )}
            </div>
            {collapsed && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-3 py-2 text-muted hover:text-danger transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </>
        ) : (
          <div className={`flex ${collapsed ? 'flex-col' : ''} gap-2 px-1`}>
            <Link
              href="/login"
              className={`flex items-center justify-center gap-2 bg-accent text-surface-base font-semibold rounded-lg transition-colors hover:bg-accent/90 ${
                collapsed ? 'w-full p-2' : 'flex-1 py-2 text-[13px]'
              }`}
              title={collapsed ? 'Login' : undefined}
            >
              {collapsed ? <UserIcon size={16} /> : 'Login'}
            </Link>
            {!collapsed && (
              <Link
                href="/signup"
                className="flex-1 flex items-center justify-center py-2 text-[13px] font-semibold text-primary border border-border-default rounded-lg hover:bg-surface-inset transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
  return (
    <div className="flex h-full min-h-screen bg-surface-base">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed xl:sticky top-0 left-0 h-screen z-50 flex flex-col bg-surface-sidebar border-r border-border-subtle transition-all duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
        } ${collapsed ? 'w-[68px]' : 'w-60'}`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 xl:hidden text-muted hover:text-primary"
        >
          <X size={20} />
        </button>
        {sidebarContent}
      </aside>
      <div className="flex-1 min-w-0 flex flex-col bg-surface-base">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 sm:px-6 lg:px-8 h-16 bg-surface-base border-b border-border-subtle">
          <button
            onClick={() => setMobileOpen(true)}
            className="xl:hidden text-secondary hover:text-primary transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-primary">
              {NAV_ITEMS.find((i) => isActive(i.path))?.label ||
                (pathname === '/settings' ? 'Settings' : 'Dashboard')}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent status-dot" />
            Live
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

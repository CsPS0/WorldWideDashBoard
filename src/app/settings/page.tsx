"use client";
import { useState, useEffect, useRef } from 'react';
import {
  Save,
  User as UserIcon,
  Lock,
  Gamepad2,
  MonitorPlay,
  Music,
  LayoutGrid,
  List,
  AlertCircle,
  CheckCircle2,
  Link2,
  Camera,
} from 'lucide-react';
type Tab = 'account' | 'integrations' | 'dashboard';
export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<Tab>('account');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarDirty, setAvatarDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [steamId, setSteamId] = useState('');
  const [youtubeHandle, setYoutubeHandle] = useState('');
  const [favoriteArtist, setFavoriteArtist] = useState('');
  const [dashboardStyle, setDashboardStyle] = useState('grid');
  const [hiddenWidgets, setHiddenWidgets] = useState<string[]>([]);
  const widgets = [
    { id: 'steam', label: 'Steam Player Count' },
    { id: 'youtube', label: 'YouTube Analytics' },
    { id: 'music', label: 'Global Top 10 Music' },
    { id: 'crypto', label: 'Crypto Markets' },
    { id: 'exchange', label: 'Exchange Rates' },
    { id: 'politics', label: 'Election 2026' },
  ];
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setAvatarUrl(data.user.avatarUrl || null);
          setSteamId(data.user.steamId || '');
          setYoutubeHandle(data.user.youtubeHandle || '');
          setFavoriteArtist(data.user.favoriteArtist || '');
        }
      })
      .catch(() => {});
    fetch('/api/auth/preferences')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then((data) => {
        setDashboardStyle(data.dashboardStyle || 'grid');
        try {
          setHiddenWidgets(JSON.parse(data.hiddenWidgets || '[]'));
        } catch {
          setHiddenWidgets([]);
        }
      })
      .catch(() => {});
  }, []);
  const handleSave = async () => {
    setMessage(null);
    if (activeTab === 'account' && password && password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    setSaving(true);
    try {
      if (activeTab === 'account') {
        const payload: Record<string, string> = {};
        if (password) payload.password = password;
        if (avatarDirty) payload.avatarUrl = avatarUrl || '';
        if (Object.keys(payload).length === 0) {
          setMessage({ type: 'error', text: 'No changes to save.' });
          setSaving(false);
          return;
        }
        const res = await fetch('/api/auth/me', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setMessage({ type: 'success', text: 'Account updated.' });
          setPassword('');
          setConfirmPassword('');
          setAvatarDirty(false);
        } else {
          const d = await res.json();
          setMessage({ type: 'error', text: d.error || 'Failed to update.' });
        }
      } else if (activeTab === 'integrations') {
        const res = await fetch('/api/auth/me', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ steamId, youtubeHandle, favoriteArtist }),
        });
        if (res.ok) {
          setMessage({ type: 'success', text: 'Integrations saved.' });
        } else {
          setMessage({ type: 'error', text: 'Failed to save integrations.' });
        }
      } else if (activeTab === 'dashboard') {
        const res = await fetch('/api/auth/preferences', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dashboardStyle,
            hiddenWidgets: JSON.stringify(hiddenWidgets),
          }),
        });
        if (res.ok) {
          setMessage({ type: 'success', text: 'Dashboard preferences saved.' });
        } else {
          setMessage({ type: 'error', text: 'Failed to save preferences.' });
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };
  const toggleWidget = (id: string) => {
    setHiddenWidgets((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-10 h-10 border-[3px] border-border-subtle border-t-accent rounded-full animate-spin" />
      </div>
    );
  }
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'account', label: 'Account', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  ];
  return (
    <div className="w-full max-w-2xl">
      <div className="flex gap-1 p-1 bg-surface-inset rounded-lg mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setMessage(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-accent/10 text-accent'
                : 'text-muted hover:text-primary'
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>
      {message && (
        <div
          className={`flex items-center gap-2.5 p-3 rounded-lg mb-4 text-sm font-medium border ${
            message.type === 'success'
              ? 'bg-success/10 border-success/20 text-success'
              : 'bg-danger/10 border-danger/20 text-danger'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {message.text}
        </div>
      )}
      <div className="glass-card p-6 space-y-5">
        {activeTab === 'account' && (
          <>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative w-20 h-20 rounded-full shrink-0 bg-surface-inset border-2 border-dashed border-border-subtle hover:border-accent transition-colors flex items-center justify-center group overflow-hidden"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <UserIcon size={28} className="text-muted" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                  <Camera size={18} className="text-primary" />
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 512 * 1024) {
                    setMessage({ type: 'error', text: 'Image must be under 512 KB.' });
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    setAvatarUrl(reader.result as string);
                    setAvatarDirty(true);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <div className="min-w-0">
                <div className="text-sm font-medium text-primary">{user.username}</div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-accent hover:underline mt-0.5"
                >
                  {avatarUrl ? 'Change photo' : 'Upload photo'}
                </button>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => { setAvatarUrl(null); setAvatarDirty(true); }}
                    className="text-xs text-danger hover:underline mt-0.5 ml-3"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-secondary uppercase tracking-wider">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-surface-inset border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-secondary uppercase tracking-wider">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-surface-inset border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
          </>
        )}
        {activeTab === 'integrations' && (
          <div className="space-y-5">
            <p className="text-sm text-secondary">Paste the full URL from your browser&apos;s address bar for each service.</p>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Gamepad2 size={13} /> Steam Profile URL
              </label>
              <input
                type="url"
                value={steamId}
                onChange={(e) => setSteamId(e.target.value)}
                placeholder="https://steamcommunity.com/id/chonya"
                className="w-full bg-surface-inset border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors"
              />
              <p className="text-[11px] text-muted">e.g. https://steamcommunity.com/id/yourname</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <MonitorPlay size={13} /> YouTube Channel URL
              </label>
              <input
                type="url"
                value={youtubeHandle}
                onChange={(e) => setYoutubeHandle(e.target.value)}
                placeholder="https://www.youtube.com/@CsPS0"
                className="w-full bg-surface-inset border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors"
              />
              <p className="text-[11px] text-muted">e.g. https://www.youtube.com/@YourChannel</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Music size={13} /> Spotify Artist URL
              </label>
              <input
                type="url"
                value={favoriteArtist}
                onChange={(e) => setFavoriteArtist(e.target.value)}
                placeholder="https://open.spotify.com/artist/4LZ4De2MoO3lP6QaNCfvcu"
                className="w-full bg-surface-inset border border-border-subtle rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors"
              />
              <p className="text-[11px] text-muted">Open the artist on Spotify, click Share → Copy link, and paste it here.</p>
            </div>
          </div>
        )}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-medium text-secondary uppercase tracking-wider mb-3 block">Layout</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'grid', label: 'Grid', icon: LayoutGrid },
                  { id: 'stacked', label: 'Stacked', icon: List },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDashboardStyle(opt.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
                      dashboardStyle === opt.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border-default bg-surface-inset hover:border-border-subtle'
                    }`}
                  >
                    <opt.icon size={24} className={dashboardStyle === opt.id ? 'text-accent' : 'text-secondary'} />
                    <span className={`text-sm font-medium ${dashboardStyle === opt.id ? 'text-primary' : 'text-secondary'}`}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-secondary uppercase tracking-wider mb-3 block">Visible Widgets</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {widgets.map((w) => {
                  const visible = !hiddenWidgets.includes(w.id);
                  return (
                    <label
                      key={w.id}
                      className="flex items-center gap-3 bg-surface-inset px-3 py-2.5 rounded-lg cursor-pointer hover:bg-surface-card-hover transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={visible}
                        onChange={() => toggleWidget(w.id)}
                        className="w-4 h-4 accent-accent rounded"
                      />
                      <span className={`text-sm ${visible ? 'text-primary' : 'text-secondary'}`}>{w.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-surface-base text-sm font-semibold py-2.5 px-5 rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-surface-base/20 border-t-surface-base rounded-full animate-spin" />
          ) : (
            <Save size={15} />
          )}
          Save
        </button>
      </div>
    </div>
  );
}

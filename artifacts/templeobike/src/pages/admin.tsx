import { useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Preorder {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  note: string | null;
  createdAt: string;
}

interface RetreatBooking {
  id: number;
  name: string;
  partner: string;
  email: string;
  phone: string;
  location: string;
  virtualTier: string | null;
  note: string | null;
  createdAt: string;
}

interface SubmissionsData {
  preorders: Preorder[];
  retreats: RetreatBooking[];
}

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ─── Admin Page ───────────────────────────────────────────────────────────────

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [data, setData] = useState<SubmissionsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [tab, setTab] = useState<'retreats' | 'preorders'>('retreats');

  const fetchData = useCallback(async (pwd: string, loc?: string) => {
    setLoading(true);
    try {
      const url = loc
        ? `${BASE_URL}/api/admin/submissions?location=${encodeURIComponent(loc)}`
        : `${BASE_URL}/api/admin/submissions`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      if (res.status === 401) {
        setAuthError('Incorrect password.');
        setAuthed(false);
        setData(null);
        return;
      }
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const json = await res.json();
      setData(json);
      setAuthed(true);
      setAuthError('');
    } catch {
      setAuthError('Could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchData(password);
  };

  const handleFilterChange = (loc: string) => {
    setLocationFilter(loc);
    fetchData(password, loc || undefined);
  };

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#06080F] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">
              Submissions Admin
            </div>
            <h1 className="text-2xl font-serif font-semibold text-foreground">
              Temple Obike
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Private area — enter your admin password
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition"
                placeholder="Enter admin password"
                autoFocus
                required
              />
              {authError && (
                <p className="mt-2 text-xs text-red-400">{authError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-[#c99a5e] transition disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const retreats = data?.retreats ?? [];
  const preorders = data?.preorders ?? [];

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#06080F] text-foreground font-sans">

      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
            Submissions Admin
          </span>
          <h1 className="text-lg font-serif font-semibold text-foreground mt-0.5">
            Temple Obike
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition">
            ← Back to site
          </a>
          <button
            onClick={() => { setAuthed(false); setPassword(''); setData(null); }}
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Enquiries', value: retreats.length + preorders.length },
            { label: 'Retreat Bookings', value: retreats.length },
            { label: 'Book Pre-orders', value: preorders.length },
            {
              label: 'Accra / Mauritius / Virtual',
              value: `${retreats.filter(r => r.location === 'Accra').length} / ${retreats.filter(r => r.location === 'Mauritius').length} / ${retreats.filter(r => r.location === 'Virtual').length}`,
            },
          ].map(stat => (
            <div
              key={stat.label}
              className="bg-card border border-border p-4"
            >
              <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xl font-serif font-semibold text-foreground">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-white/5">
          {(['retreats', 'preorders'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-xs font-semibold tracking-wide uppercase transition border-b-2 -mb-px ${
                tab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'retreats' ? `Retreat Bookings (${retreats.length})` : `Book Pre-orders (${preorders.length})`}
            </button>
          ))}
        </div>

        {/* Retreat Bookings Tab */}
        {tab === 'retreats' && (
          <>
            {/* Location filter */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs text-muted-foreground mr-1">Filter by location:</span>
              {['', 'Accra', 'Mauritius', 'Virtual'].map(loc => (
                <button
                  key={loc || 'all'}
                  onClick={() => handleFilterChange(loc)}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition border ${
                    locationFilter === loc
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {loc || 'All locations'}
                </button>
              ))}
            </div>

            {retreats.length === 0 ? (
              <div className="bg-card border border-border p-10 text-center text-muted-foreground text-sm">
                No retreat bookings yet{locationFilter ? ` for ${locationFilter}` : ''}.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Date', 'Name', 'Partner', 'Email', 'Phone', 'Location', 'Package', 'Note'].map(h => (
                        <th
                          key={h}
                          className="text-left px-3 py-3 text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {retreats.map((r, i) => (
                      <tr
                        key={r.id}
                        className={`border-b border-white/5 hover:bg-card/50 transition ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}
                      >
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{formatDate(r.createdAt)}</td>
                        <td className="px-3 py-3 text-foreground font-medium whitespace-nowrap">{r.name}</td>
                        <td className="px-3 py-3 text-foreground whitespace-nowrap">{r.partner}</td>
                        <td className="px-3 py-3">
                          <a href={`mailto:${r.email}`} className="text-primary hover:underline whitespace-nowrap">{r.email}</a>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{r.phone}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                            r.location === 'Accra' ? 'bg-amber-900/40 text-amber-300' :
                            r.location === 'Mauritius' ? 'bg-purple-900/40 text-purple-300' :
                            'bg-blue-900/40 text-blue-300'
                          }`}>
                            {r.location}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">
                          {r.virtualTier || '—'}
                        </td>
                        <td className="px-3 py-3 text-muted-foreground text-xs max-w-[200px] truncate" title={r.note ?? ''}>
                          {r.note || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Pre-orders Tab */}
        {tab === 'preorders' && (
          <>
            {preorders.length === 0 ? (
              <div className="bg-card border border-border p-10 text-center text-muted-foreground text-sm">
                No book pre-orders yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Date', 'Name', 'Email', 'Phone', 'Note'].map(h => (
                        <th
                          key={h}
                          className="text-left px-3 py-3 text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preorders.map((p, i) => (
                      <tr
                        key={p.id}
                        className={`border-b border-white/5 hover:bg-card/50 transition ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}
                      >
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{formatDate(p.createdAt)}</td>
                        <td className="px-3 py-3 text-foreground font-medium whitespace-nowrap">{p.name}</td>
                        <td className="px-3 py-3">
                          <a href={`mailto:${p.email}`} className="text-primary hover:underline whitespace-nowrap">{p.email}</a>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{p.phone || '—'}</td>
                        <td className="px-3 py-3 text-muted-foreground text-xs max-w-[260px] truncate" title={p.note ?? ''}>
                          {p.note || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
            <div className="text-primary text-sm">Loading…</div>
          </div>
        )}
      </div>
    </div>
  );
}

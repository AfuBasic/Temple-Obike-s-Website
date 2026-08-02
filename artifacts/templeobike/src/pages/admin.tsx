import { useState, useCallback, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Preorder {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  note: string | null;
  followedUp: boolean;
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
  followedUp: boolean;
  createdAt: string;
}

interface SpeakingEnquiry {
  id: number;
  name: string;
  email: string;
  organization: string;
  eventDate: string;
  audienceSize: string;
  topic: string;
  budget: string | null;
  message: string;
  followedUp: boolean;
  createdAt: string;
}

interface SubmissionsData {
  preorders: Preorder[];
  retreats: RetreatBooking[];
  enquiries: SpeakingEnquiry[];
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

function escapeCsvCell(value: string | number | null | undefined): string {
  const str = value == null ? '' : String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCsv(filename: string, headers: string[], rows: (string | number | null | undefined)[][]) {
  const csvLines = [
    headers.map(escapeCsvCell).join(','),
    ...rows.map(row => row.map(escapeCsvCell).join(',')),
  ];
  const blob = new Blob([csvLines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// ─── Admin Page ───────────────────────────────────────────────────────────────

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [data, setData] = useState<SubmissionsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [tab, setTab] = useState<'enquiries' | 'retreats' | 'preorders' | 'email-templates'>('enquiries');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // ── Email template state ─────────────────────────────────────────────────
  const [templates, setTemplates] = useState({
    preorder_autoresponse_subject: '',
    preorder_autoresponse_message: '',
    retreat_autoresponse_subject: '',
    retreat_autoresponse_message: '',
  });
  const [templatesSaveStatus, setTemplatesSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const fetchTemplates = useCallback(async (pwd: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/settings`, {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      if (!res.ok) return;
      const json = await res.json() as Record<string, string>;
      setTemplates({
        preorder_autoresponse_subject: json.preorder_autoresponse_subject ?? '',
        preorder_autoresponse_message: json.preorder_autoresponse_message ?? '',
        retreat_autoresponse_subject:  json.retreat_autoresponse_subject ?? '',
        retreat_autoresponse_message:  json.retreat_autoresponse_message ?? '',
      });
    } catch { /* silent */ }
  }, []);

  const saveTemplates = async () => {
    setTemplatesSaveStatus('saving');
    try {
      const res = await fetch(`${BASE_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${password}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templates),
      });
      setTemplatesSaveStatus(res.ok ? 'saved' : 'error');
      if (res.ok) setTimeout(() => setTemplatesSaveStatus('idle'), 3000);
    } catch {
      setTemplatesSaveStatus('error');
    }
  };

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

  // Fetch templates once we have a valid password (after successful login)
  useEffect(() => {
    if (authed && password) fetchTemplates(password);
  }, [authed, password, fetchTemplates]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchData(password);
  };

  const handleFilterChange = (loc: string) => {
    setLocationFilter(loc);
    fetchData(password, loc || undefined);
  };

  const toggleFollowedUp = async (type: 'retreat' | 'preorder' | 'enquiry', id: number, current: boolean) => {
    const key = `${type}-${id}`;
    setTogglingId(key);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/submissions/${type}/${id}/followed-up`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${password}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followedUp: !current }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);

      // Optimistically update local state
      setData(prev => {
        if (!prev) return prev;
        if (type === 'retreat') {
          return { ...prev, retreats: prev.retreats.map(r => r.id === id ? { ...r, followedUp: !current } : r) };
        } else if (type === 'preorder') {
          return { ...prev, preorders: prev.preorders.map(p => p.id === id ? { ...p, followedUp: !current } : p) };
        } else {
          return { ...prev, enquiries: prev.enquiries.map(e => e.id === id ? { ...e, followedUp: !current } : e) };
        }
      });
    } catch {
      // Silent failure — the toggle will revert visually on next fetch
    } finally {
      setTogglingId(null);
    }
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
  const enquiries = data?.enquiries ?? [];

  const retreatsPending = retreats.filter(r => !r.followedUp).length;
  const preordersPending = preorders.filter(p => !p.followedUp).length;
  const enquiriesPending = enquiries.filter(e => !e.followedUp).length;

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
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Speaking Enquiries', value: enquiries.length },
            { label: 'Retreat Bookings', value: retreats.length },
            { label: 'Book Pre-orders', value: preorders.length },
            {
              label: 'Accra / Mauritius / Virtual',
              value: `${retreats.filter(r => r.location === 'Accra').length} / ${retreats.filter(r => r.location === 'Mauritius').length} / ${retreats.filter(r => r.location === 'Virtual').length}`,
            },
            {
              label: 'Pending Follow-up',
              value: retreatsPending + preordersPending + enquiriesPending,
              highlight: retreatsPending + preordersPending + enquiriesPending > 0,
            },
          ].map(stat => (
            <div
              key={stat.label}
              className={`border p-4 ${
                'highlight' in stat && stat.highlight
                  ? 'bg-amber-950/30 border-amber-700/40'
                  : 'bg-card border-border'
              }`}
            >
              <div className={`text-xs mb-1 ${'highlight' in stat && stat.highlight ? 'text-amber-400/70' : 'text-muted-foreground'}`}>
                {stat.label}
              </div>
              <div className={`text-xl font-serif font-semibold ${'highlight' in stat && stat.highlight ? 'text-amber-300' : 'text-foreground'}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-white/5 flex-wrap">
          <button
            onClick={() => setTab('enquiries')}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wide uppercase transition border-b-2 -mb-px ${tab === 'enquiries' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Speaking Enquiries ({enquiries.length}){enquiriesPending > 0 ? ` · ${enquiriesPending} pending` : ''}
          </button>
          <button
            onClick={() => setTab('retreats')}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wide uppercase transition border-b-2 -mb-px ${tab === 'retreats' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Retreat Bookings ({retreats.length}){retreatsPending > 0 ? ` · ${retreatsPending} pending` : ''}
          </button>
          <button
            onClick={() => setTab('preorders')}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wide uppercase transition border-b-2 -mb-px ${tab === 'preorders' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Book Pre-orders ({preorders.length}){preordersPending > 0 ? ` · ${preordersPending} pending` : ''}
          </button>
          <button
            onClick={() => setTab('email-templates')}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wide uppercase transition border-b-2 -mb-px ${tab === 'email-templates' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Email Templates
          </button>
        </div>

        {/* Speaking Enquiries Tab */}
        {tab === 'enquiries' && (
          <>
            {enquiries.length > 0 && (
              <div className="flex justify-end mb-5">
                <button
                  onClick={() => {
                    downloadCsv(
                      'speaking-enquiries.csv',
                      ['Date', 'Name', 'Email', 'Organization', 'Event Date', 'Audience', 'Topic', 'Budget', 'Message', 'Followed Up'],
                      enquiries.map(e => [
                        formatDate(e.createdAt),
                        e.name,
                        e.email,
                        e.organization,
                        e.eventDate,
                        e.audienceSize,
                        e.topic,
                        e.budget ?? '',
                        e.message,
                        e.followedUp ? 'Yes' : 'No',
                      ]),
                    );
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition whitespace-nowrap"
                >
                  ↓ Export CSV
                </button>
              </div>
            )}
            {enquiries.length === 0 ? (
              <div className="bg-card border border-border p-10 text-center text-muted-foreground text-sm">
                No speaking enquiries yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['', 'Date', 'Name', 'Email', 'Organization', 'Event Date', 'Audience', 'Topic', 'Budget', 'Message'].map(h => (
                        <th key={h} className="text-left px-3 py-3 text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e, i) => (
                      <tr
                        key={e.id}
                        className={`border-b border-white/5 hover:bg-card/50 transition ${
                          !e.followedUp ? 'bg-amber-950/20' : i % 2 === 0 ? '' : 'bg-white/[0.015]'
                        }`}
                      >
                        <td className="px-3 py-3 whitespace-nowrap">
                          <button
                            onClick={() => toggleFollowedUp('enquiry', e.id, e.followedUp)}
                            disabled={togglingId === `enquiry-${e.id}`}
                            title={e.followedUp ? 'Mark as not followed up' : 'Mark as followed up'}
                            className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-all ${
                              e.followedUp
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-amber-500/60 bg-transparent hover:border-amber-400'
                            } disabled:opacity-40`}
                          >
                            {e.followedUp && (
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{formatDate(e.createdAt)}</td>
                        <td className="px-3 py-3 font-medium whitespace-nowrap">
                          <span className={e.followedUp ? 'text-foreground' : 'text-amber-200'}>{e.name}</span>
                          {!e.followedUp && (
                            <span className="ml-2 inline-block px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-amber-900/50 text-amber-400 rounded-sm">
                              pending
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <a href={`mailto:${e.email}`} className="text-primary hover:underline whitespace-nowrap">{e.email}</a>
                        </td>
                        <td className="px-3 py-3 text-foreground whitespace-nowrap">{e.organization}</td>
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{e.eventDate}</td>
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{e.audienceSize}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-card border border-border text-muted-foreground">
                            {e.topic}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{e.budget || '—'}</td>
                        <td className="px-3 py-3 text-muted-foreground text-xs max-w-[220px] truncate" title={e.message}>
                          {e.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Retreat Bookings Tab */}
        {tab === 'retreats' && (
          <>
            {/* Location filter + Export */}
            <div className="flex items-center gap-2 mb-5 flex-wrap justify-between">
              <div className="flex items-center gap-2 flex-wrap">
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
              {retreats.length > 0 && (
                <button
                  onClick={() => {
                    const suffix = locationFilter ? `-${locationFilter.toLowerCase()}` : '';
                    downloadCsv(
                      `retreat-bookings${suffix}.csv`,
                      ['Date', 'Name', 'Partner', 'Email', 'Phone', 'Location', 'Package', 'Note', 'Followed Up'],
                      retreats.map(r => [
                        formatDate(r.createdAt),
                        r.name,
                        r.partner,
                        r.email,
                        r.phone,
                        r.location,
                        r.virtualTier ?? '',
                        r.note ?? '',
                        r.followedUp ? 'Yes' : 'No',
                      ]),
                    );
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition whitespace-nowrap"
                >
                  ↓ Export CSV
                </button>
              )}
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
                      {['', 'Date', 'Name', 'Partner', 'Email', 'Phone', 'Location', 'Package', 'Note'].map(h => (
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
                        className={`border-b border-white/5 hover:bg-card/50 transition ${
                          !r.followedUp
                            ? 'bg-amber-950/20'
                            : i % 2 === 0 ? '' : 'bg-white/[0.015]'
                        }`}
                      >
                        <td className="px-3 py-3 whitespace-nowrap">
                          <button
                            onClick={() => toggleFollowedUp('retreat', r.id, r.followedUp)}
                            disabled={togglingId === `retreat-${r.id}`}
                            title={r.followedUp ? 'Mark as not followed up' : 'Mark as followed up'}
                            className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-all ${
                              r.followedUp
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-amber-500/60 bg-transparent hover:border-amber-400'
                            } disabled:opacity-40`}
                          >
                            {r.followedUp && (
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{formatDate(r.createdAt)}</td>
                        <td className="px-3 py-3 font-medium whitespace-nowrap">
                          <span className={r.followedUp ? 'text-foreground' : 'text-amber-200'}>{r.name}</span>
                          {!r.followedUp && (
                            <span className="ml-2 inline-block px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-amber-900/50 text-amber-400 rounded-sm">
                              pending
                            </span>
                          )}
                        </td>
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
            {preorders.length > 0 && (
              <div className="flex justify-end mb-5">
                <button
                  onClick={() => {
                    downloadCsv(
                      'book-preorders.csv',
                      ['Date', 'Name', 'Email', 'Phone', 'Note', 'Followed Up'],
                      preorders.map(p => [
                        formatDate(p.createdAt),
                        p.name,
                        p.email,
                        p.phone ?? '',
                        p.note ?? '',
                        p.followedUp ? 'Yes' : 'No',
                      ]),
                    );
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition whitespace-nowrap"
                >
                  ↓ Export CSV
                </button>
              </div>
            )}
            {preorders.length === 0 ? (
              <div className="bg-card border border-border p-10 text-center text-muted-foreground text-sm">
                No book pre-orders yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['', 'Date', 'Name', 'Email', 'Phone', 'Note'].map(h => (
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
                        className={`border-b border-white/5 hover:bg-card/50 transition ${
                          !p.followedUp
                            ? 'bg-amber-950/20'
                            : i % 2 === 0 ? '' : 'bg-white/[0.015]'
                        }`}
                      >
                        <td className="px-3 py-3 whitespace-nowrap">
                          <button
                            onClick={() => toggleFollowedUp('preorder', p.id, p.followedUp)}
                            disabled={togglingId === `preorder-${p.id}`}
                            title={p.followedUp ? 'Mark as not followed up' : 'Mark as followed up'}
                            className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-all ${
                              p.followedUp
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-amber-500/60 bg-transparent hover:border-amber-400'
                            } disabled:opacity-40`}
                          >
                            {p.followedUp && (
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{formatDate(p.createdAt)}</td>
                        <td className="px-3 py-3 font-medium whitespace-nowrap">
                          <span className={p.followedUp ? 'text-foreground' : 'text-amber-200'}>{p.name}</span>
                          {!p.followedUp && (
                            <span className="ml-2 inline-block px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-amber-900/50 text-amber-400 rounded-sm">
                              pending
                            </span>
                          )}
                        </td>
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

        {/* Email Templates Tab */}
        {tab === 'email-templates' && (
          <div className="max-w-2xl space-y-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Edit the subject and body of the confirmation emails sent automatically when someone submits a form. Use <code className="bg-card px-1 py-0.5 text-xs text-primary">{'{name}'}</code> anywhere in the message and it will be replaced with the person's name. For the retreat email, <code className="bg-card px-1 py-0.5 text-xs text-primary">{'{location_part}'}</code> is replaced with <em>— Accra</em>, <em>— Mauritius</em>, or <em>— Virtual</em>.
            </p>

            {/* Pre-order email */}
            <div className="bg-card border border-border p-6 space-y-5">
              <div className="text-xs font-bold tracking-[0.15em] uppercase text-primary">Book Pre-order Confirmation</div>
              <div>
                <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">Subject</label>
                <input
                  type="text"
                  value={templates.preorder_autoresponse_subject}
                  onChange={e => setTemplates(t => ({ ...t, preorder_autoresponse_subject: e.target.value }))}
                  className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">Message</label>
                <textarea
                  rows={8}
                  value={templates.preorder_autoresponse_message}
                  onChange={e => setTemplates(t => ({ ...t, preorder_autoresponse_message: e.target.value }))}
                  className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition resize-y font-mono leading-relaxed"
                />
              </div>
            </div>

            {/* Retreat email */}
            <div className="bg-card border border-border p-6 space-y-5">
              <div className="text-xs font-bold tracking-[0.15em] uppercase text-primary">Retreat Enquiry Confirmation</div>
              <div>
                <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">Subject</label>
                <input
                  type="text"
                  value={templates.retreat_autoresponse_subject}
                  onChange={e => setTemplates(t => ({ ...t, retreat_autoresponse_subject: e.target.value }))}
                  className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">Message</label>
                <textarea
                  rows={8}
                  value={templates.retreat_autoresponse_message}
                  onChange={e => setTemplates(t => ({ ...t, retreat_autoresponse_message: e.target.value }))}
                  className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition resize-y font-mono leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={saveTemplates}
                disabled={templatesSaveStatus === 'saving'}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-[#c99a5e] transition disabled:opacity-60"
              >
                {templatesSaveStatus === 'saving' ? 'Saving…' : 'Save Templates'}
              </button>
              {templatesSaveStatus === 'saved' && (
                <span className="text-sm text-emerald-400">✓ Saved — changes will take effect on the next form submission.</span>
              )}
              {templatesSaveStatus === 'error' && (
                <span className="text-sm text-red-400">Failed to save. Please try again.</span>
              )}
            </div>
          </div>
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

import React, { useCallback, useEffect, useState } from 'react';
import {
  LayoutDashboard, Users, UserRound, Search, ShieldCheck,
  LogOut, RefreshCw, Menu, X, Brain
} from 'lucide-react';

const API = 'http://127.0.0.1:8000';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0, patients: 0, therapists: 0, admins: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }, []);

  const fetchAdminData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in again to access the admin panel.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = activeTab === 'Overview'
        ? `${API}/api/admin/stats`
        : `${API}/api/admin/users`;

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Request failed (${response.status})`);
      }

      if (activeTab === 'Overview') {
        setStats(data);
      } else if (Array.isArray(data)) {
        setUsers(data);
      } else {
        throw new Error('Unexpected users response from server.');
      }
    } catch (err) {
      setError(err.message || 'Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const filteredUsers = users.filter(user => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      (user.name || '').toLowerCase().includes(q) ||
      (user.email || '').toLowerCase().includes(q);
    const matchesRole =
      roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const navigation = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Users', icon: Users }
  ];

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-violet-100 text-violet-700' },
    { label: 'Patients', value: stats.patients, icon: UserRound, color: 'bg-pink-100 text-pink-700' },
    { label: 'Therapists', value: stats.therapists, icon: ShieldCheck, color: 'bg-purple-100 text-purple-700' },
    { label: 'Admins', value: stats.admins, icon: ShieldCheck, color: 'bg-fuchsia-100 text-fuchsia-700' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F6FF] text-slate-800">
      {sidebarOpen && (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-violet-100 bg-white text-slate-700 shadow-sm transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-violet-100 px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Brain size={25} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-violet-950">Mindful</h1>
              <p className="mt-1 text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>
          <button className="rounded-lg p-1 hover:bg-violet-50 md:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <div className="px-5 pb-2 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Main Menu</p>
        </div>

        <nav className="flex-1 space-y-2 p-4 pt-2">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all ${isActive ? 'bg-violet-100 text-violet-800 shadow-sm' : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'}`}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <button onClick={logout} className="m-4 flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-pink-50 hover:text-pink-700">
          <LogOut size={19} />
          Logout
        </button>
      </aside>

      <main className="min-h-screen md:ml-64">
        <header className="flex items-center justify-between border-b border-violet-100 bg-white px-4 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu size={23} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-violet-950">{activeTab}</h2>
              <p className="mt-1 text-sm text-slate-500">Mindful administration</p>
            </div>
          </div>
          <button onClick={fetchAdminData} disabled={loading} className="flex items-center gap-2 rounded-xl border border-violet-200 px-3 py-2 text-sm text-violet-700 hover:bg-violet-50 disabled:opacity-50">
            <RefreshCw size={16} />
            Refresh
          </button>
        </header>

        <section className="p-4 sm:p-8">
          {error && (
            <div role="alert" className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-pink-200 bg-pink-50 p-4 text-sm text-pink-700">
              <span>{error}</span>
              <button onClick={fetchAdminData} className="font-semibold underline">Try again</button>
            </div>
          )}

          {activeTab === 'Overview' && (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-violet-950">Dashboard Overview</h3>
                <p className="mt-1 text-sm text-slate-500">Statistics retrieved from your database.</p>
              </div>

              {loading && <p className="mb-4 text-sm text-slate-500">Loading statistics...</p>}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map(card => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">{card.label}</p>
                        <div className={`rounded-xl p-3 ${card.color}`}>
                          <Icon size={21} />
                        </div>
                      </div>
                      <p className="mt-5 text-3xl font-bold text-violet-950">{card.value ?? 0}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-violet-950">User Summary</h3>
                <p className="mt-2 text-sm text-slate-500">{stats.totalUsers} registered accounts in MongoDB.</p>
                <button onClick={() => setActiveTab('Users')} className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">
                  View Registered Users
                </button>
              </div>
            </>
          )}

          {activeTab === 'Users' && (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-violet-950">Registered Users</h3>
                <p className="mt-1 text-sm text-slate-500">Search and filter accounts registered in MongoDB.</p>
              </div>

              <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full rounded-xl border border-violet-100 bg-white py-3 pl-10 pr-4 outline-none focus:border-violet-400"
                  />
                </div>
                <select
                  value={roleFilter}
                  onChange={event => setRoleFilter(event.target.value)}
                  className="rounded-xl border border-violet-100 bg-white px-4 py-3 outline-none focus:border-violet-400"
                >
                  <option value="all">All roles</option>
                  <option value="patient">Patients</option>
                  <option value="therapist">Therapists</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
                <div className="flex flex-wrap justify-between gap-2 border-b border-violet-50 px-5 py-4">
                  <p className="font-semibold text-violet-950">User Accounts</p>
                  <p className="text-sm text-slate-500">{filteredUsers.length} of {users.length} users</p>
                </div>

                {loading ? (
                  <p className="p-8 text-center text-slate-500">Loading users...</p>
                ) : !error && filteredUsers.length === 0 ? (
                  <p className="p-8 text-center text-slate-500">No users found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left text-sm">
                      <thead className="bg-violet-50 text-slate-600">
                        <tr>
                          <th className="px-5 py-4 font-semibold">Name</th>
                          <th className="px-5 py-4 font-semibold">Email</th>
                          <th className="px-5 py-4 font-semibold">Role</th>
                          <th className="px-5 py-4 font-semibold">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-violet-50">
                        {filteredUsers.map(user => (
                          <tr key={user._id || user.email} className="hover:bg-violet-50/50">
                            <td className="px-5 py-4 font-medium">{user.name || 'Unnamed user'}</td>
                            <td className="px-5 py-4 text-slate-600">{user.email}</td>
                            <td className="px-5 py-4">
                              <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold capitalize text-violet-800">
                                {user.role || 'patient'}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-slate-500">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}